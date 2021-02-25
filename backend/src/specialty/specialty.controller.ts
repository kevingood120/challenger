import { Controller, Get } from '@nestjs/common';
import { SpecialtyService } from './specialty.service';

@Controller('specialty')
export class SpecialtyController {
    constructor(
        private specialtyService: SpecialtyService
    ) {}

    @Get()
    async findAll() {
        return await this.specialtyService.findAll()
    }
}
