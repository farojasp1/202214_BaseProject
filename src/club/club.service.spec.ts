/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ClubService } from './club.service';
import { ClubEntity } from './club.entity';
import { faker } from '@faker-js/faker';

describe('ClubService', () => {
  let service: ClubService;
  let repository: Repository<ClubEntity>;
  let clubList: ClubEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ClubService],
    }).compile();

    service = module.get<ClubService>(ClubService);
    repository = module.get<Repository<ClubEntity>>(getRepositoryToken(ClubEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  const seedDatabase = async () => {
    repository.clear();
    clubList = [];
    for(let i = 0; i < 5; i++){
        const club: ClubEntity = await repository.save({
        name: faker.company.name(),
        foundationDate: faker.date.birthdate(),
        image: faker.image.imageUrl(),
        description: faker.lorem.sentence(3)})
        clubList.push(club);
    }
  }
    
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all clubs', async () => {
    const clubs: ClubEntity[] = await service.findAll();
    expect(clubs).not.toBeNull();
    expect(clubs).toHaveLength(clubList.length);
  });

  it('findOne should return a club by id', async () => {
    const storedClub: ClubEntity = clubList[0];
    const club: ClubEntity = await service.findOne(storedClub.id);
    expect(club).not.toBeNull();
    expect(club.name).toEqual(storedClub.name)
    expect(club.foundationDate).toEqual(storedClub.foundationDate)
    expect(club.description).toEqual(storedClub.description)
    expect(club.imagen).toEqual(storedClub.imagen)
  });

  it('findOne should throw an exception for an invalid club', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "El id de club no encontrado")
  });

  it('create should return a new club', async () => {
    const club: ClubEntity = {
      id: "",
      name: faker.company.name(), 
      description: faker.lorem.sentence(), 
      foundationDate : faker.date.birthdate(),
      imagen: faker.image.imageUrl(),
      socios: []
    }

    const newClub: ClubEntity = await service.create(club);
    expect(newClub).not.toBeNull();

    const storedClub: ClubEntity = await repository.findOne({where: {id: newClub.id}})
    expect(storedClub).not.toBeNull();
    expect(storedClub.name).toEqual(newClub.name)
    expect(storedClub.foundationDate).toEqual(newClub.foundationDate)
    expect(storedClub.description).toEqual(newClub.description)
    expect(storedClub.imagen).toEqual(newClub.imagen)
  });

  it('update should modify a club', async () => {
    const club: ClubEntity = clubList[0];
    club.name = "New name";
    club.description = "New description";
  
    const updatedClub: ClubEntity = await service.update(club.id, club);
    expect(updatedClub).not.toBeNull();
  
    const storedClub: ClubEntity = await repository.findOne({ where: { id: club.id } })
    expect(storedClub).not.toBeNull();
    expect(storedClub.name).toEqual(club.name)
    expect(storedClub.foundationDate).toEqual(club.foundationDate)
    expect(storedClub.description).toEqual(club.description)
    expect(storedClub.imagen).toEqual(club.imagen)
  });
 
  it('update should throw an exception for an invalid club', async () => {
    let club: ClubEntity = clubList[0];
    club = {
      ...club, name: "New name", description: "New description"
    }
    await expect(() => service.update("0", club)).rejects.toHaveProperty("message", "El Id club no encontrado")
  });

  it('delete should remove a club', async () => {
    const club: ClubEntity = clubList[0];
    await service.delete(club.id);
  
    const deletedClub: ClubEntity = await repository.findOne({ where: { id: club.id } })
    expect(deletedClub).toBeNull();
  });

  it('delete should throw an exception for an invalid club', async () => {
    const club: ClubEntity = clubList[0];
    await service.delete(club.id);
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "El Id club no encontrado")
  });

});
