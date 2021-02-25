import IPagination from "../interfaces/IPagination";
import {
    IsInt,
    IsNotEmpty,
} from 'class-validator'

export default class PaginationDto implements IPagination {
    
    @IsInt()
    @IsNotEmpty()
    page: number;

    @IsInt()
    @IsNotEmpty()
    limit: number;
}