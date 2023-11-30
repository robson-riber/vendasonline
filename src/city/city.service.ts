import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CacheService } from '../cache/cache.service';
import { Repository } from 'typeorm';
import { CityEntity } from './entities/city.entity';

@Injectable()
export class CityService {

    constructor(
        @InjectRepository(CityEntity)
        private readonly cityRepository: Repository<CityEntity>,
        private readonly cacheService: CacheService,
    ){}


    async getAllCitiesByStateId(stateid: number): Promise<CityEntity[]>{
        return this.cacheService.getCache<CityEntity[]>(`state_${stateid}`, () =>
            this.cityRepository.find({
                where: {
                    state_id: stateid
                },
            }),
        );
    }

    async findCityById(cityId: number ): Promise<CityEntity>{

        const city = await this.cityRepository.findOne({
            where: {
                id: cityId
            }
        });

        if (!city){
            throw new NotFoundException(`CityId: ${cityId} não encontrado!`);
        }

        return city;

    }
}
