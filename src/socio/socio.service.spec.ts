/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { SocioEntity } from './socio.entity';
import { SocioEntity } from './club.entity';
import { SocioService } from './socio.service';
import { faker } from '@faker-js/faker';


describe('SocioService', () => {
  let service: SocioService;
  let repository: Repository<SocioEntity>;
  let socioList: SocioEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocioService],
    }).compile();

    service = module.get<SocioService>(SocioService);
    repository = module.get<Repository<SocioEntity>>(getRepositoryToken(SocioEntity));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  const seedDatabase = async () => {
    repository.clear();
    socioList = [];
    for(let i = 0; i < 5; i++){
        const socio: SocioEntity = await repository.save({
        name: faker.company.name(),
        birthdate: faker.date.birthdate(),
        email: faker.internet.email()})
        socioList.push(socio);
    }
  }
    
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all socios', async () => {
    const socios: SocioEntity[] = await service.findAll();
    expect(socios).not.toBeNull();
    expect(socios).toHaveLength(socioList.length);
  });

  it('findOne should return a socio by id', async () => {
    const storedSocio: SocioEntity = socioList[0];
    const socio: SocioEntity = await service.findOne(storedSocio.id);
    expect(socio).not.toBeNull();
    expect(socio.name).toEqual(storedSocio.name)
    expect(socio.birthdate).toEqual(storedSocio.birthdate)
    expect(socio.email).toEqual(storedSocio.email)    
  });

  it('findOne should throw an exception for an invalid socio', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "El id de socio no encontrado")
  });

  it('create should return a new socio', async () => {
    const socio: SocioEntity = {
      id: "",
      name: faker.company.name(),
      birthdate: faker.date.birthdate(),
      email: faker.internet.email()      
    }

    const newSocio: SocioEntity = await service.create(club);
    expect(newSocio).not.toBeNull();

    const storedSocio: SocioEntity = await repository.findOne({where: {id: newSocio.id}})
    expect(storedSocio).not.toBeNull();
    expect(storedSocio.name).toEqual(newSocio.name)
    expect(storedSocio.birthdate).toEqual(newSocio.birthdate)
    expect(storedSocio.email).toEqual(newSocio.email)    
  });

  it('update should modify a socio', async () => {
    const socio: SocioEntity = socioList[0];
    socio.name = "New name";
    socio.email = "new@email.com";
  
    const updatedSocio: SocioEntity = await service.update(socio.id, socio);
    expect(updatedSocio).not.toBeNull();
  
    const storedSocio: SocioEntity = await repository.findOne({ where: { id: socio.id } })
    expect(storedSocio).not.toBeNull();
    expect(storedSocio.name).toEqual(socio.name)
    expect(storedSocio.birthdate).toEqual(socio.birthdate)
    expect(storedSocio.email).toEqual(socio.email)    
  });
 
  it('update should throw an exception for an invalid socio', async () => {
    let socio: SocioEntity = socioList[0];
    socio = {
      ...socio, name: "New name", email: "new@email.com"
    }
    await expect(() => service.update("0", socio)).rejects.toHaveProperty("message", "El Id socio no encontrado")
  });

  it('delete should remove a socio', async () => {
    const socio: SocioEntity = socioList[0];
    await service.delete(socio.id);
  
    const deletedSocio: SocioEntity = await repository.findOne({ where: { id: socio.id } })
    expect(deletedSocio).toBeNull();
  });

  it('delete should throw an exception for an invalid socio', async () => {
    const socio: SocioEntity = socioList[0];
    await service.delete(socio.id);
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "El Id socio no encontrado")
  });


});


