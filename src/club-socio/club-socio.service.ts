/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SocioEntity } from 'src/socio/socio.entity';
import { ClubEntity } from 'src/club/club.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class ClubSocioService {
  constructor(
    @InjectRepository(SocioEntity)
    private readonly socioRepository: Repository<SocioEntity>,

    @InjectRepository(ClubEntity)
    private readonly clubRepository: Repository<ClubEntity>

  ) {}

  async addMemberToClub(socioId: string, clubId: string): Promise<SocioEntity> {
    const socio: SocioEntity = await this.socioRepository.findOne({where: {id: socioId}});
    if (!socio)
      throw new BusinessLogicException("Id de Socio no encontrado", BusinessError.NOT_FOUND);

    const club: ClubEntity = await this.clubRepository.findOne({where: {id: clubId}, relations: ["socios"]})
    if (!club)
      throw new BusinessLogicException("Id de Club no encontrado", BusinessError.NOT_FOUND);

    club.socios = [...club.socios, socio];
    return await this.clubRepository.save(club)

  }
  
//   findMembersFromClub:

async findMembersFromClub(clubId: string): Promise<SocioEntity[]> {
    const club: ClubEntity = await this.clubRepository.findOne({where: {id: clubId}, relations: ["socios"]});
    if (!club)
      throw new BusinessLogicException("Id Club no encontrado", BusinessError.NOT_FOUND)
   
    return club.socios;
}

//   findMemberFromClub:

async findMemberFromClub(clubId: string, socioId: string): Promise<SocioEntity> {
    const socio: SocioEntity = await this.socioRepository.findOne({where: {id: socioId}});
    if (!socio)
      throw new BusinessLogicException("Id de Socio no encontrado", BusinessError.NOT_FOUND)

    const club: ClubEntity = await this.clubRepository.findOne({where: {id: clubId}, relations: ["socios"]});
    if (!club)
      throw new BusinessLogicException("Id de Club no encontrado", BusinessError.NOT_FOUND);
      
    const clubsocio: SocioEntity = club.socios.find(e => e.id === socio.id);

    if (!clubsocio)
      throw new BusinessLogicException("El socio no se encuentra afiliado al club", BusinessError.PRECONDITION_FAILED)

    return clubsocio;
}

//   updateMembersFromClub:
async updateMembersFromClub(clubId: string, socios: SocioEntity[]): Promise<ClubEntity> {
    const club: ClubEntity = await this.clubRepository.findOne({where: {id: clubId}, relations: ["socios"]});

    if (!club)
      throw new BusinessLogicException("Id de Club no encontrado", BusinessError.NOT_FOUND)

    for (let i = 0; i < socios.length; i++) {
        const socio: SocioEntity = await this.socioRepository.findOne({where: {id: socios[i].id}});
        if (!socio)
        throw new BusinessLogicException("Id de socio no encontrado", BusinessError.NOT_FOUND)
}

    club.socios = socios;
    return await this.clubRepository.save(club);
}


//   deleteMemberFromClub:
async deleteMemberFromClub(clubId: string, socioId: string){
    const socio: SocioEntity = await this.socioRepository.findOne({where: {id: socioId}});
    if (!socio)
      throw new BusinessLogicException("Id de socio no encontrado", BusinessError.NOT_FOUND)

    const club: ClubEntity = await this.clubRepository.findOne({where: {id: clubId}, relations: ["socios"]});
    if (!club)
      throw new BusinessLogicException("Id de Club no encontrado", BusinessError.NOT_FOUND)

    const clubSocio: SocioEntity = club.socios.find(e => e.id === socio.id);
    if (!clubSocio)
      throw new BusinessLogicException("El socio no se encuentra afiliado al club", BusinessError.PRECONDITION_FAILED)

    club.socios = club.socios.filter(e => e.id !== socioId);
    await this.clubRepository.save(club);
}

}
