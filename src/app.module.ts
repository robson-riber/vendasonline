import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: 'db_vendasonline',
      host: '127.0.0.1',
      password: 'Robson@77',
      username: 'root',
      port: 3306,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [`${__dirname}/migration/{.ts,*.js}`],
      migrationsRun: true
    }),
    StateModule,
    CityModule,
    AddressModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
