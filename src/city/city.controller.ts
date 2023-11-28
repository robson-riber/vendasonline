import { Controller, Get, Param } from '@nestjs/common';
import { CityService } from './city.service';
import { CityEntity } from './entities/city.entity';

@Controller('city')
export class CityController {

    constructor(private readonly cityService: CityService){}

    @Get('/:state_id')
    async getAllCitiesByStateId(@Param('state_id')state_id: number): Promise<CityEntity[]>{

        return this.cityService.getAllCitiesByStateId(state_id);

    }
}
