import { Controller } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { ClubDto } from './club.dto';
import { ClubEntity } from './club.entity';
import { ClubService } from './club.service';

@Controller('club')
@UseInterceptors(BusinessErrorsInterceptor)

export class ClubController {
  constructor(private readonly clubService: ClubService) {}   

  @Get()
  async findAll() {
    return await this.clubService.findAll();
  }

  @Get(':ClubId')
  async findOne(@Param('ClubId') ClubId: string) {
    return await this.clubService.findOne(ClubId);
  }

  @Post()
  async create(@Body() clubDto: clubDto) {
    const club: ClubEntity = plainToInstance(ClubEntity, clubDto);
    return await this.clubService.create(club);
  }

  @Put(':ClubId')
  async update(@Param('ClubId') ClubId: string, @Body() clubDto: clubDto) {
    const club: ClubEntity = plainToInstance(ClubEntity, clubDto);
    return await this.clubService.update(ClubId, club);
  }

  @Delete(':ClubId')
  @HttpCode(204)
  async delete(@Param('ClubId') ClubId: string) {
    return await this.clubService.delete(ClubId);
  }

}
