import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { CityService } from 'src/city/city.service';
import { ReturnCepExternal } from './dtos/return-cep-external.dto';



@Injectable()
export class CorreiosService {
    
    URL_CORREIOS = process.env.URL_CEP_CORREIOS;

    constructor(
        private readonly httpService: HttpService,
        private readonly cityService: CityService
        
    ) {}

    async finAddressByCep(cep: string): Promise<ReturnCepExternal> {
        const returnCEp: ReturnCepExternal = await this.httpService.axiosRef.get<ReturnCepExternal>( this.URL_CORREIOS.replace('{CEP}', cep)).then(
            (result) => {
                if (result.data.erro === 'true'){
                    throw new NotFoundException('CEP não encontrado.');
                }

                return result.data;
            
            }).catch((error: AxiosError) => {
                throw new BadRequestException(`Erro ao conectar com o servidor ViaCEp - ${error.message} `)
            });

        const city = await this.cityService.findCityByName(returnCEp.localidade, returnCEp.uf);

        return returnCEp;
    }


}
