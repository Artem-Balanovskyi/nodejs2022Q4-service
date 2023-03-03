import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserEntity } from './entities/user.entity';
import { PASSWORD_NOT_CORRECT, USER_NOT_FOUND } from 'src/utils/messages';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import 'dotenv/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const createdUser = this.userRepository.create(dto);
    return await this.userRepository.save(createdUser);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (user) return user;
    throw new NotFoundException(USER_NOT_FOUND);
  }

  async update(
    userId: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ): Promise<UserEntity> {
    const updatedUser: UserEntity = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!updatedUser) throw new NotFoundException(USER_NOT_FOUND);

    const isMatch = await compare(oldPassword, updatedUser.password);
    console.log(`isMatch: ${isMatch}`);

    if (!isMatch) throw new ForbiddenException(PASSWORD_NOT_CORRECT);
    else {
      updatedUser.version += 1;
      updatedUser.password = newPassword;
      return await this.userRepository.save(updatedUser);
    }
  }

  async remove(userId: string): Promise<void> {
    const result = await this.userRepository.delete(userId);

    if (result.affected === 0) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
  }
}
