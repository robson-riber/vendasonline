import { Controller, Get, Param } from '@nestjs/common';
import { CorreiosService } from './correios.service';
import { ReturnCepExternal } from './dtos/return-cep-external.dto';

@Controller('correios')
export class CorreiosController {

    constructor(
        private readonly correiosService: CorreiosService
    ){}

    @Get('/:cep')
    async finAll(
        @Param('cep') cep: string): Promise<ReturnCepExternal>{
        return this.correiosService.finAddressByCep(cep)
    }
}
