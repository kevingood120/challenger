import IModel from "./IModel";
import ISpecialty from "./ISpecialty";

export default interface Medic extends IModel {
    name: string
    crm: string
    phone: string
    cellPhone: string
    zipcode: string
    street: string
    neighborhood: string
    addressNumber: string
    state: string
    city: string
    complement: string
    specialties: ISpecialty[]
}