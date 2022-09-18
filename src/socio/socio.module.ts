import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Module } from '@nestjs/common';
import { SocioService } from './socio.service';
import { SocioEntity } from './socio.entity';
import { SocioController } from './socio.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SocioEntity])],
  providers: [SocioService],
  controllers: [SocioController],
  //controllers: [SocioController]
})
export class SocioModule {}