import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'The user`s login can not be empty.' })
  @IsString({ message: ' The user`s login should be a string.' })
  login: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'The user`s password can not be empty.' })
  @IsString({ message: ' The user`s password should be a string.' })
  password: string;
}
