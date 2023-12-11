import { HttpService } from '@nestjs/axios';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { rejects } from 'assert';
import { AxiosError, AxiosResponse } from 'axios';
import { Client } from 'nestjs-soap';
import { resolve } from 'path';
import { CityService } from 'src/city/city.service';
import { CityEntity } from 'src/city/entities/city.entity';
import { ResponsePriceCorreios } from './dtos/response-price-correios';
import { ReturnCepExternal } from './dtos/return-cep-external.dto';
import { ReturnCep } from './dtos/return-cep.dto';
import { SizeProductDto } from './dtos/size-product.dto';
import { CdFormatEnum } from './enums/cd-format.enum';



@Injectable()
export class CorreiosService {
    
    URL_CORREIOS = process.env.URL_CEP_CORREIOS;
    CEP_COMPANY = process.env.CEP_COMPANY;

    constructor(
        @Inject('SOAP_CORREIOS')
        private readonly mySoapClient: Client,
        private readonly httpService: HttpService,
        private readonly cityService: CityService
        
    ) {}

    async finAddressByCep(cep: string): Promise<ReturnCep> {
        const returnCEp: ReturnCepExternal = await this.httpService.axiosRef.get<ReturnCepExternal>( this.URL_CORREIOS.replace('{CEP}', cep)).then(
            (result) => {
                if (result.data.erro === 'true'){
                    throw new NotFoundException('CEP não encontrado.');
                }

                return result.data;
            
            }).catch((error: AxiosError) => {
                throw new BadRequestException(`Erro ao conectar com o servidor ViaCEp - ${error.message} `)
            });

        const city: CityEntity | undefined = await this.cityService.findCityByName(returnCEp.localidade, returnCEp.uf).catch(() => undefined);


        return new ReturnCep(returnCEp, city?.id, city?.state?.id);
    }


    async priceDelivery(cdServico: string, cepDestino: string, sizeProductDto: SizeProductDto): Promise<ResponsePriceCorreios>{

        return new Promise((resolve) => {
            this.mySoapClient.CalcPrecoPrazo({
                nCdServico: cdServico,
                sCepOrigem: this.CEP_COMPANY,
                sCepDestino: cepDestino,
                nCdFormato: CdFormatEnum.BOX,
                nVlPeso: sizeProductDto.weight,
                nVlComprimento: sizeProductDto.length,
                nVlAltura: sizeProductDto.height,
                nVlLargura: sizeProductDto.width,
                nVlDiametro: sizeProductDto.diameter,
                nCdEmpresa: '',
                sDsSenha: '',
                sCdMaoPropria: 'N',
                nVlValorDeclarado: 0,
                sCdAvisoRecebimento: 'N',
            }, (_, resp: ResponsePriceCorreios) => {
                if (resp){
                    resolve(resp);
                }else {
                    throw new BadRequestException('ERROR SOAP');
                }
            })
        })
    }


}
