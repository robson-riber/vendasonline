import { Controller, Get, Param } from '@nestjs/common';
import { CorreiosService } from './correios.service';
import { ResponsePriceCorreios } from './dtos/response-price-correios';
import { ReturnCep } from './dtos/return-cep.dto';

@Controller('correios')
export class CorreiosController {

    constructor(
        private readonly correiosService: CorreiosService
    ){}

    @Get('/price-delivery')
    async priceDelivery(): Promise<ResponsePriceCorreios>{
        return this.correiosService.priceDelivery()
    }

    @Get('/:cep')
    async finAll(
        @Param('cep') cep: string): Promise<ReturnCep>{
        return this.correiosService.finAddressByCep(cep)
    }

    
}
