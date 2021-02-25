import ISpecialty from "src/base/interfaces/ISpecialty";
import Model from "src/base/Model";
import { Column, Entity } from "typeorm";

@Entity()
export default class Specialty extends Model implements ISpecialty {
    
    @Column()
    desc: string
}