import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString, IsUUID, Length, MaxLength, MinLength } from "class-validator";
import IMedic from "../interfaces/IMedic";
import ISpecialty from "../interfaces/ISpecialty";

export default class MedicDto implements IMedic {
    @IsString({ message: 'Tem que ser string' })
    @IsNotEmpty({ message: 'Obrigatório' })
    @MaxLength(120, { message: 'Máximo 120 caractéres' })
    name: string;

    @Length(7, 7, { message: 'CRM deve possuir 11 caractéres' })
    @IsNotEmpty({ message: 'Obrigatório' })
    @IsString({ message: 'Tem que ser string' })
    crm: string;


    @Length(10, 10, { message: 'Telefone deve possuir 11 caractéres' })
    @IsNotEmpty({ message: 'Obrigatório' })
    @IsString({ message: 'Tem que ser string' })
    phone: string;


    @Length(11, 11, { message: 'Celular deve possuir 11 caractéres' })
    @IsNotEmpty({ message: 'Obrigatório' })
    @IsString({ message: 'Tem que ser string' })
    cellPhone: string;
    
    @MaxLength(8, { message: 'Máximo 8 caractéres' })
    @IsNotEmpty({ message: 'Obrigatório' })
    @IsString({ message: 'Tem que ser string' })
    zipcode: string;

    @IsString({ message: 'Tem que ser string' })
    @IsNotEmpty({ message: 'Obrigatório' })
    street: string;

    @IsString({ message: 'Tem que ser string' })
    @IsNotEmpty({ message: 'Obrigatório' })
    neighborhood: string;

    @IsString({ message: 'Tem que ser string' })
    @IsNotEmpty({ message: 'Obrigatório' })
    addressNumber: string;

    @IsString({ message: 'Tem que ser string' })
    @IsNotEmpty({ message: 'Obrigatório' })
    @MaxLength(2, { message: 'Máximo 2 caractéres' })
    state: string;

    @IsString({ message: 'Tem que ser string' })
    @IsNotEmpty({ message: 'Obrigatório' })
    city: string;

    @IsString({ message: 'Tem que ser string' })
    @IsNotEmpty({ message: 'Obrigatório' })
    complement: string;
    

    @ArrayMinSize(2, { message: 'No minímo duas especialidades' })
    @IsArray({ message: 'Tem que ser um array' })
    specialties: ISpecialty[];

    @IsOptional()
    @IsString({ message: 'Tem que ser string' })
    @IsUUID('all',{ message: 'Tem que ser UUID' })
    id?: string;
}