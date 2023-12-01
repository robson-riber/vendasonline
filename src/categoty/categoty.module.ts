import { Module } from '@nestjs/common';
import { CategotyService } from './categoty.service';
import { CategotyController } from './categoty.controller';

@Module({
  providers: [CategotyService],
  controllers: [CategotyController]
})
export class CategotyModule {}
