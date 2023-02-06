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

  constructor(private db: InMemoryDB) { }

  create(dto: CreateUserDto): UserEntity {
    const newUser: UserEntity = {
      id: uuidv4(),
      ...dto,
      version: 1,
      createdAt: +new Date(),
      updatedAt: null
    }
    this.db.users.push(newUser);
    // return newUser;
    // If you want to see the user's passwords in response - uncomment the line above and comment the lines below.
    const response: UserEntity = { ...newUser };
    response.password = '*******';
    return response;
  }

  findAll(): UserEntity[] {
    // return this.db.users;
    // If you want to see the user's passwords in response - uncomment the line above and comment the lines below.
    const users = this.db.users;
    let response = structuredClone(users).map((user) => {
      user.password = '*******';
      return user;
    })
    return response;
  }
  
  findOne(id: string): UserEntity {
    const user: UserEntity | null = this.db.users.find(user => user.id === id);
    if (!user) throwException(USER_NOT_FOUND, 404);
    else {
      // return user;
      // If you want to see the user's passwords in response - uncomment the line above and comment the lines below.
      const response: UserEntity = { ...user };
      response.password = '*******';
      return response;
    }
  }

  update(id: string, dto: UpdatePasswordDto): UserEntity {
    const { oldPassword, newPassword } = dto;
    const user: UserEntity | null = this.db.users.find(user => user.id === id);
    if (!user) throwException(USER_NOT_FOUND, 404);
    if (user.password !== oldPassword) {
      throwException(PASSWORD_NOT_CORRECT, 403)
    } else {
      user.version += 1;
      user.updatedAt = +new Date();
      user.password = newPassword;
      // return user;
      // If you want to see the user's passwords in response - uncomment the line above and comment the lines below.
      const response: UserEntity = { ...user };
      response.password = '*******';
      return response;
    }
  }

  remove(id: string): void {
    this.findOne(id);
    this.db.users = this.db.users.filter(user => user.id !== id);
  }
}
