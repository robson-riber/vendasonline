import { Injectable } from '@nestjs/common';
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
}
