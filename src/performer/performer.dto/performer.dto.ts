import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class PerformerDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  readonly desc: string;

  @IsUrl()
  @IsNotEmpty()
  readonly imagen: string;
}
