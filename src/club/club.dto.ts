import {IsDate, IsNotEmpty, IsString, IsUrl} from 'class-validator';
import { ClubEntity } from './club.entity';
import { SocioEntity } from 'src/socio/socio.entity';

export class ClubDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
 
  @IsString()
  @IsNotEmpty()
  readonly description: string;
 
  @IsUrl()
  @IsNotEmpty()
  readonly imagen: string;

  @IsDate()
  @IsNotEmpty()
  readonly foundationDate: Date;

  readonly socios: SocioEntity;
}
