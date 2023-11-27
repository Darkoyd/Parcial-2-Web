import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TrackDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsNumber()
  @IsNotEmpty()
  readonly duracion: string;
}
