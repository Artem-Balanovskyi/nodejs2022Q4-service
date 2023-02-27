import {
  IsNotEmpty,
  IsString,
  ValidateIf,
  Min,
  IsInt,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsUUID()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null; // refers to Artist

  @IsOptional()
  @IsUUID()
  @ValidateIf((object, value) => value !== null)
  albumId: string | null; // refers to Album

  @IsInt()
  @Min(0)
  duration: number; // integer number
}
