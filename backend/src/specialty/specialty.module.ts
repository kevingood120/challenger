import { Module } from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { SpecialtyController } from './specialty.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Specialty from './specialty.entity';

@Module({
  providers: [SpecialtyService],
  controllers: [SpecialtyController],
  imports: [TypeOrmModule.forFeature([Specialty])],
})
export class SpecialtyModule {}
