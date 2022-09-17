import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';

import { Module } from '@nestjs/common';
import { SocioService } from './socio.service';

@Module({
  providers: [SocioService]
})
export class SocioModule {
  constructor(
    @InjectRepository(SocioService)
    private readonly museumRepository: Repository<SocioService>
){}








}
