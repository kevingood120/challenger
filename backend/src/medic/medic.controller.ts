import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import IMedic from 'src/base/interfaces/IMedic';
import MedicDto from 'src/base/validations/MedicDto';
import PaginationDto from 'src/base/validations/PaginationDto';
import { MedicService } from './medic.service';

@Controller('medic')
export class MedicController {
    constructor(
        private medicService: MedicService
    ) {}

    @Get(':page/:limit')
    async findAndCount(
        @Query() queries: Partial<IMedic>,
        @Param() pagination: PaginationDto,
    ){
        return await this.medicService.findAndCount(queries, pagination)
    }

    @Post()
    async save(@Body() medic: MedicDto) {
        return await this.medicService.save(medic)
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.medicService.delete(id)
    }

    @Get('findOne')
    async findOne(
        @Query() queries: Partial<IMedic>,
    ) {
        console.log(queries)
        return await this.medicService.findOne(queries)
    }
}
