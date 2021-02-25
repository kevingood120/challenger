import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import IMedic from 'src/base/interfaces/IMedic';
import IPagination from 'src/base/interfaces/IPagination';
import { Like, Repository } from 'typeorm';
import Medic from './medic.entity';
import _ from 'lodash'

@Injectable()
export class MedicService {
    constructor(
        @InjectRepository(Medic)
        private medicRepo: Repository<Medic>
    ) {}

    async save(medic: IMedic) {
        return this.medicRepo.save(medic)
    }

    async delete(id: string) {
        return this.medicRepo.softDelete({ id })
    }

    async findAndCount(medic: Partial<IMedic>, { page, limit }: IPagination) {
        let medicQueryBuilder = await this.medicRepo.createQueryBuilder('medic')
            .innerJoinAndSelect('medic.specialties', 'specialties')
            

        for(let prop in medic) {
            const value = medic[prop]
            if(prop === 'specialties')
                medicQueryBuilder = medicQueryBuilder.andWhere(`${prop}.id = :value`, { value: value})
            else
                medicQueryBuilder = medicQueryBuilder.andWhere(`medic.${prop} like :value`, { value: `%${value}%`})

        }



        medicQueryBuilder = medicQueryBuilder.skip((page - 1) * limit).take(limit)


        const [rows, count] = await medicQueryBuilder.getManyAndCount()

        return {
            rows, 
            count
        }
    }

    async findOne(medic: Partial<IMedic>) {
        const where = {}

        for(let prop in medic) {
            const value = medic[prop]
            if(!Number.isInteger(value))
                where[prop] = Like(`%${medic[prop]}%`)
            else
                where[prop] = value
        }
        
        return await this.medicRepo.findOne({ where, relations: ['specialties'] })
    }
}
