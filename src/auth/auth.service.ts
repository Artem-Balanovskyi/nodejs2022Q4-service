import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { sign, verify, JwtPayload } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import 'dotenv/config';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import {
  NO_REFRESH_TOKEN,
  PASSWORD_NOT_CORRECT,
  REF_TOKEN_INVALID,
  USER_NOT_FOUND,
} from 'src/utils/messages';

@Injectable()
export class AuthService {
  @InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>;
  constructor(private usersService: UsersService) {}

  signup = async (dto: CreateUserDto) => {
    return await this.usersService.create(dto);
  };

  login = async ({ login, password }: LoginDto) => {
    const user = await this.userRepository.findOne({ where: { login } });

    if (!user) throw new ForbiddenException(USER_NOT_FOUND);
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) throw new ForbiddenException(PASSWORD_NOT_CORRECT);

    return this.generateTokens(user.id, user.login);
  };

  refresh = async (body: { refreshToken: string }) => {
    const { refreshToken } = body;
    if (!refreshToken) throw new UnauthorizedException(NO_REFRESH_TOKEN);

    try {
      const { userId, login } = verify(
        refreshToken,
        process.env.JWT_SECRET_REFRESH_KEY,
      ) as JwtPayload;
      return this.generateTokens(userId, login);
    } catch {
      throw new ForbiddenException(REF_TOKEN_INVALID);
    }
  };

  private generateTokens(userId: string, login: string) {
    const payload: JwtPayload = { userId, login };
    const accSecretKey = process.env.JWT_SECRET_KEY;
    const refSecretKey = process.env.JWT_SECRET_REFRESH_KEY;
    const accTokenExpIn = process.env.TOKEN_EXPIRE_TIME;
    const refTokenExpIn = process.env.TOKEN_REFRESH_EXPIRE_TIME;

    const accessToken = sign(payload, accSecretKey, {
      expiresIn: accTokenExpIn,
    });

    const refreshToken = sign(payload, refSecretKey, {
      expiresIn: refTokenExpIn,
    });

    return { accessToken, refreshToken };
  }
}
