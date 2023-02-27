import { IsNotEmpty, IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'The artist`s name can not be empty.' })
  @IsString({ message: 'The artist`s name should be a string.' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'The grammy can not be empty.' })
  @IsBoolean({ message: 'The grammy should be a boolean type.' })
  grammy: boolean;
}
