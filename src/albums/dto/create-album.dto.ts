import {
  IsNotEmpty,
  IsString,
  IsInt,
  Min,
  Max,
  IsOptional,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'The albums`s name can not be empty.' })
  @IsString({ message: 'The albums`s name should be a string.' })
  name: string;

  @ApiProperty()
  @IsInt({ message: 'The albums`s year should be a number.' })
  @Min(0)
  @Max(new Date().getFullYear())
  year: number;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null; // refers to Artist
}
