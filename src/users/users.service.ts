import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { InMemoryDB } from 'src/utils/in-memory.db';
import { v4 as uuidv4 } from 'uuid';
import { throwException } from 'src/utils/throwException';
import { UserEntity } from './entities/user.entity';
import { PASSWORD_NOT_CORRECT, USER_NOT_FOUND } from 'src/utils/messages';

@Injectable()
export class UsersService {
  constructor(private db: InMemoryDB) {}

  create(dto: CreateUserDto): UserEntity {
    const newUser: UserEntity = {
      id: uuidv4(),
      ...dto,
      version: 1,
      createdAt: +new Date(),
      updatedAt: +new Date(),
    };
    this.db.users.push(newUser);
    const response: UserEntity = { ...newUser };
    delete response.password;
    return response;
  }

  findAll(): UserEntity[] {
    const users = this.db.users;
    const response = structuredClone(users).map((user) => {
      delete user.password;
      return user;
    });
    return response;
  }

  findOne(id: string): UserEntity {
    const user: UserEntity | null = this.db.users.find(
      (user) => user.id === id,
    );
    if (!user) throwException(USER_NOT_FOUND, 404);
    else {
      const response: UserEntity = { ...user };
      delete response.password;
      return response;
    }
  }

  update(id: string, dto: UpdatePasswordDto): UserEntity {
    const { oldPassword, newPassword } = dto;
    const user: UserEntity | null = this.db.users.find(
      (user) => user.id === id,
    );
    if (!user) throwException(USER_NOT_FOUND, 404);
    if (user.password !== oldPassword) {
      throwException(PASSWORD_NOT_CORRECT, 403);
    } else {
      user.version += 1;
      user.updatedAt = +new Date();
      user.password = newPassword;
      const response: UserEntity = { ...user };
      delete response.password;
      return response;
    }
  }

  remove(id: string): void {
    this.findOne(id);
    this.db.users = this.db.users.filter((user) => user.id !== id);
  }
}
