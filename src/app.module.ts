import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

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
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    })
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
