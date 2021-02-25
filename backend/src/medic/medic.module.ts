import { Module } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { MedicController } from './medic.controller';
import Medic from './medic.entity';
import { MedicService } from './medic.service';

@Module({
  controllers: [MedicController],
  providers: [MedicService],
  imports: [TypeOrmModule.forFeature([Medic])],
})
export class MedicModule {}
