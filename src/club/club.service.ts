import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '/src/shared/errors/business-errors';
import { Repository } from 'typeorm';
import { ClubEntity } from './club.entity';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(ClubEntity)
    private readonly clubRepository: Repository<ClubEntity>
  ){}

  async findAll(): Promise<ClubEntity[]> {
    return await this.clubRepository.find({ relations: ["clubs"] });
  }

  async findOne(id: string): Promise<ClubEntity> {
    const club: ClubEntity = await this.clubRepository.findOne({
      where: { id },
      relations: ['clubs'],
    });
    if (!club)
      throw new BusinessLogicException(
        'Id de club no encontrado',
        BusinessError.NOT_FOUND,
      );

    return club;
  }

  async create(club: ClubEntity): Promise<ClubEntity> {
    if (club.description.length > 100)
      throw new BusinessLogicException(
        'Descripcion de club deber ser menor a 100 caracteres',
        BusinessError.NOT_FOUND,
      );

    return await this.clubRepository.save(club);
  }

  async update(id: string, club: ClubEntity): Promise<ClubEntity> {
    const perisistedClub: ClubEntity = await this.clubRepository.findOne({where:{id}});
    
    if (!perisistedClub)
      throw new BusinessLogicException(
        'Id de club no encontrado',
        BusinessError.NOT_FOUND,
      );

    if (club.description.length > 100)
      throw new BusinessLogicException(
        'Descripcion de club deber ser menor a 100 caracteres',
        BusinessError.NOT_FOUND,
      );

    club.id = id;

    return await this.clubRepository.save(club);
  }

  async delete(id: string) {
    const club: ClubEntity = await this.clubRepository.findOne({where:{id}});
    if (!club)
      throw new BusinessLogicException(
        'Id de club no encontrado',
        BusinessError.NOT_FOUND,
      );

    await this.clubRepository.remove(club);
  }
}