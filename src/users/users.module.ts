import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DB_Module } from 'src/utils/in-memory.db';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [DB_Module],
})
export class UsersModule {}
