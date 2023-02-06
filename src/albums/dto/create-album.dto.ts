import { IsNotEmpty, IsString, IsNumber, Min, Max, IsOptional, IsUUID, ValidateIf } from "class-validator";

export class CreateAlbumDto {

    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNumber()
    @Min(0)
    @Max(new Date().getFullYear())
    year: number;
  
    @IsOptional()
    @IsUUID()
    @ValidateIf((object, value) => value !== null)
    artistId: string | null; // refers to Artist

  }