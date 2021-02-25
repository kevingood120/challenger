import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { MedicModule } from './medic/medic.module';
import { SpecialtyModule } from './specialty/specialty.module'
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    MedicModule, 
    SpecialtyModule
  ]
})
export class AppModule {
  constructor(
    private connection: Connection
  ) { }
}
