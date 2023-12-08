import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';



@Injectable()
export class CorreiosService {
    
    URL_CORREIOS = process.env.URL_CEP_CORREIOS;

    constructor(private readonly httpService: HttpService) {}

    async finAddressByCep(cep: string): Promise<AxiosResponse<any>> {
        return this.httpService.axiosRef.get(this.URL_CORREIOS.replace('{CEP}', cep)).then(
            (result) => {
                return result.data;
            }).catch((error: AxiosError) => {
                throw new BadRequestException('Erro ao conectar com o sservido ViaCEp.')
            });
    }


}
