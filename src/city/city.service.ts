import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityEntity } from './entities/city.entity';

@Injectable()
export class CityService {

    constructor(
        @InjectRepository(CityEntity)
        private readonly cityRepository: Repository<CityEntity>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ){}

    async getAllCitiesByStateId(state_id: number): Promise<CityEntity[]>{

        const citiesCache: CityEntity[] = await this.cacheManager.get(`${state_id}`);
        
        if (citiesCache){
            return citiesCache;
        }

        const cities = await this.cityRepository.find({
            where: {
                state_id: state_id
            }
        })

        await this.cacheManager.set(`${state_id}`, cities);

        return cities
    }
}
