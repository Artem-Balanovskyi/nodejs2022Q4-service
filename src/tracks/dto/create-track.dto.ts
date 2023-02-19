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
  @IsNotEmpty({ message: 'The track`s name can not be empty.' })
  @IsString({ message: 'The track`s name should be a string.' })
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
  @IsNotEmpty({ message: 'The track`s duration time can not be empty.' })
  @IsInt({ message: 'The track`s duration time should be an integer number.' })
  @Min(0)
  duration: number; // integer number
}
