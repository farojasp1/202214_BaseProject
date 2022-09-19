import {IsDate, IsNotEmpty, IsString, IsEmail} from 'class-validator';
import { ClubEntity } from './club.entity';
import { SocioEntity } from 'src/socio/socio.entity';

export class SocioDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsDate()
  @IsNotEmpty()
  readonly birthdate: Date;

  readonly clubs: ClubEntity;
}
