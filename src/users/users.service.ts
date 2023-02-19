import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { v4 as uuidv4 } from 'uuid';
import { throwException } from 'src/utils/throwException';
import { UserEntity } from './entities/user.entity';
import { PASSWORD_NOT_CORRECT, USER_NOT_FOUND } from 'src/utils/messages';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) { }

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const createdUser: UserEntity = this.userRepository.create({
      id: uuidv4(),
      ...dto,
      version: 1
    });

    return await this.userRepository.save(createdUser);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (user) return user;
    throwException(USER_NOT_FOUND, 404);
  }

  async update(userId: string, dto: UpdatePasswordDto) {
    const updatedUser = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!updatedUser) throwException(USER_NOT_FOUND, 404);
    if (updatedUser.password !== dto.oldPassword) {
      throwException(PASSWORD_NOT_CORRECT, 403);
    } else {
      updatedUser.version += 1;
      updatedUser.password = dto.newPassword;
      return await this.userRepository.save(updatedUser);
     
    }
  }

  async remove(userId: string) {
    const result = await this.userRepository.delete(userId);

    if (result.affected === 0) {
      throwException(USER_NOT_FOUND, 404);
    }
  }
}