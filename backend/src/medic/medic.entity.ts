import IMedic from "src/base/interfaces/IMedic";
import ISpecialty from "src/base/interfaces/ISpecialty";
import Model from "src/base/Model";
import Specialty from "src/specialty/specialty.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";

@Entity()
export default class Medic extends Model implements IMedic {

    @Column({
        type: 'varchar',
        length: 120
    })
    name: string

    @Column({
        type: 'char',
        length: 7
    })
    crm: string

    @Column({
        type: 'char',
        length: 10
    })
    phone: string

    @Column({
        type: 'char',
        length: 11
    })
    cellPhone: string

    @Column({
        type: 'char',
        length: 8
    })
    zipcode: string

    @Column()
    street: string

    @Column()
    neighborhood: string

    @Column()
    addressNumber: string

    @Column({ 
        type: 'char', 
        length: 2
    })
    state: string

    @Column()
    city: string;


    @Column()
    complement: string

    @ManyToMany(() => Specialty)
    @JoinTable()
    specialties: ISpecialty[]
}