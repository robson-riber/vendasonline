import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/createAddress.dto';
import { AddressEntity } from './entities/address.entity';

@Injectable()
export class AddressService {

    constructor(
        @InjectRepository(AddressEntity)
        private readonly addresRepository: Repository<AddressEntity>
    ){}

    async createAddress(createAddressDto: CreateAddressDto, userId: number): Promise<AddressEntity>{
       
        //console.log('createAddressDto: 2' , createAddressDto);
       
        return this.addresRepository.save({
            ...createAddressDto,
            userId,
        });
    }
}
