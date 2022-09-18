import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { ClubEntity } from 'src/club/club.entity';
import { SocioEntity } from './socio.entity';
import { IsEmail } from 'class-validator';


@Injectable()
export class SocioService {
  constructor(
    @InjectRepository(SocioEntity)
    private readonly socioRepository: Repository<SocioEntity>
    //   @InjectRepository(ClubEntity)
    //  private readonly clubRepository: Repository<ClubEntity>
  ){}

  async findAll(): Promise<SocioEntity[]> {
    return await this.socioRepository.find({ relations: ["clubs"]});
  }
  
  async findOne(id: string): Promise<SocioEntity> {
    const socio: SocioEntity = await this.socioRepository.findOne({where: {id}, relations: ["clubs"] } );
    if (!socio)
      throw new BusinessLogicException("id de socio no encontrado", BusinessError.NOT_FOUND);
    return socio;
  }

  async create(socio: SocioEntity): Promise<SocioEntity> {
    if (!IsEmail(socio.email))
      throw new BusinessLogicException("email de socio no invalido", BusinessError.NOT_FOUND);
    return await this.socioRepository.save(socio);

  }

  async update(id: string, socio: SocioEntity): Promise<SocioEntity> {
    const socio: SocioEntity = await this.socioRepository.findOne({where:{id}});
    if (!socio)
      throw new BusinessLogicException("id de socio no encontrado", BusinessError.NOT_FOUND);

    if (!IsEmail(socio.email))
      throw new BusinessLogicException("email de socio no invalido", BusinessError.NOT_FOUND);

    socio.id = id; 
    return await this.socioRepository.save(socio);
  }

  async delete(id: string) {
    const socio: SocioEntity = await this.socioRepository.findOne({where:{id}});
    if (!socio)
      throw new BusinessLogicException("id de socio no encontrado", BusinessError.NOT_FOUND);

    await this.socioRepository.remove(socio);
  }

}