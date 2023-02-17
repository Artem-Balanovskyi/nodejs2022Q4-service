import {
  IsNotEmpty,
  IsString,
  ValidateIf,
  Min,
  IsInt,
  IsUUID,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null; // refers to Artist

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  @ValidateIf((object, value) => value !== null)
  albumId: string | null; // refers to Album

  @ApiProperty()
  @IsInt()
  @Min(0)
  duration: number; // integer number
}
