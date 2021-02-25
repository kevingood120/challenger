import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ISpecialty from 'src/base/interfaces/ISpecialty';
import { Repository } from 'typeorm';
import Specialty from './specialty.entity';

@Injectable()
export class SpecialtyService {
    constructor(
        @InjectRepository(Specialty)
        private specialtyRepo: Repository<Specialty>
    ) {}
    

    async findAll(filters?: Partial<ISpecialty>) {
        return await this.specialtyRepo.find({
            where: filters ?? {}
        })
    }
}
