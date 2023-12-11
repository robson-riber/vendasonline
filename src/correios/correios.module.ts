import { Module } from '@nestjs/common';
import { CorreiosService } from './correios.service';
import { CorreiosController } from './correios.controller';
import { HttpModule } from '@nestjs/axios';
import { CityModule } from 'src/city/city.module';
import { SoapModule } from 'nestjs-soap';

@Module({
  imports: [SoapModule.register({
    clientName: 'SOAP_CORREIOS',
    uri:'https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl='}),
    HttpModule.register({
    timeout: 5000,
    maxRedirects: 5}), CityModule],
  providers: [CorreiosService],
  controllers: [CorreiosController]
})
export class CorreiosModule {}
