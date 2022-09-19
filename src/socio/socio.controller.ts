import { Controller } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { SocioDto } from './socio.dto';
import { SocioEntity } from './socio.entity';
import { SocioService } from './socio.service';

@Controller('socio')
@UseInterceptors(BusinessErrorsInterceptor)

export class SocioController {
  constructor(private readonly socioService: SocioService) {}   

  @Get()
  async findAll() {
    return await this.socioService.findAll();
  }

  @Get(':SocioId')
  async findOne(@Param('SocioId') SocioId: string) {
    return await this.socioService.findOne(SocioId);
  }

  @Post()
  async create(@Body() socioDto: SocioDto) {
    const socio: ClubEntity = plainToInstance(ClubEntity, socioDto);
    return await this.socioService.create(socio);
  }

  @Put(':SocioId')
  async update(@Param('SocioId') SocioId: string, @Body() socioDto: SocioDto) {
    const socio: ClubEntity = plainToInstance(ClubEntity, socioDto);
    return await this.socioService.update(SocioId, socio);
  }

  @Delete(':SocioId')
  @HttpCode(204)
  async delete(@Param('SocioId') SocioId: string) {
    return await this.socioService.delete(SocioId);
  }

}