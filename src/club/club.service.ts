import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { ClubEntity } from './club.entity';



@Injectable()
export class ClubService {
    constructor(
        @InjectRepository(clubEntity)
        private readonly clubRepository: Repository<ClubEntity>
    ){}


async findAll(): Promise<ClubEntity[]> {
    return await this.clubRepository.find({ relations: ["artworks", "exhibitions"] });
}

async findOne(id: string): Promise<ClubEntity> {
    const club: ClubEntity = await this.clubRepository.findOne({where: {id}, relations: ["artworks", "exhibitions"] } );
    if (!club)
      throw new BusinessLogicException("Id de club no encontrado", BusinessError.NOT_FOUND);

    return club;
}

async create(club: ClubEntity): Promise<ClubEntity> {
    return await this.clubRepository.save(club);
}

async update(id: string, club: ClubEntity): Promise<ClubEntity> {
    const perisistedClub: ClubEntity = await this.clubRepository.findOne({where:{id}});
    if (!perisistedClub)
      throw new BusinessLogicException("Id de club no encontrado", BusinessError.NOT_FOUND);
   
    club.id = id; 
   
    return await this.clubRepository.save(club);
}

async delete(id: string) {
    const club: ClubEntity = await this.clubRepository.findOne({where:{id}});
    if (!club)
      throw new BusinessLogicException("Id de club no encontrado", BusinessError.NOT_FOUND);
 
    await this.clubRepository.remove(club);
}

}