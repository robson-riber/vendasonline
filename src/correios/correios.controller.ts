import { Controller, Get, Param } from '@nestjs/common';
import { CorreiosService } from './correios.service';

@Controller('correios')
export class CorreiosController {

    constructor(
        private readonly correiosService: CorreiosService
    ){}

    @Get('/:cep')
    async finAll(
        @Param('cep') cep: string): Promise<any>{
        return this.correiosService.finAddressByCep(cep)
    }
}
