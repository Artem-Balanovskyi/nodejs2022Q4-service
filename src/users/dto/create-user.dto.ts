import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'login', description: 'Unique login of the user.' })
  @IsNotEmpty({ message: 'The user`s login can not be empty.' })
  @IsString({ message: ' The user`s login should be a string.' })
  login: string;

  @ApiProperty({ example: 'pass', description: 'Unique password of the user.' })
  @IsNotEmpty({ message: 'The user`s password can not be empty.' })
  @IsString({ message: ' The user`s password should be a string.' })
  password: string;
}
