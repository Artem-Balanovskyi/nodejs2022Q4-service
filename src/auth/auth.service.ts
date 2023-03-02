import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  @InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>;
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  signup = async (dto: CreateUserDto) => {
    return await this.usersService.create(dto);
  };

  login = async ({ login, password }: LoginDto) => {
    const user = await this.userRepository.findOne({ where: { login } });
    if (!user) throw new ForbiddenException('User is not found');
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid)
      throw new ForbiddenException('Password is not correct');

    const { id } = user;

    const accessToken = await generateToken(id, login);
    const refreshToken = await generateToken(id, login);

    async function generateToken(id, login) {
      await this.jwtService.signAsync(
        { userId: id, login },
        {
          secret: process.env.JWT_SECRET_KEY,
          expiresIn: process.env.TOKEN_EXPIRE_TIME,
        },
      );
    }

    return { accessToken, refreshToken };
  };

  refresh = async (body: { refreshToken: string }) => {
    const { refreshToken } = body;
    if (!refreshToken)
      throw new UnauthorizedException('No refresh token in body');

    try {
      const { userId, login } = this.jwtService.verify(refreshToken);
      const user = new UserEntity({ id: userId, login });
      return await this.login(user);
    } catch {
      throw new ForbiddenException('Refresh token is outdated or invalid');
    }
  };
}
