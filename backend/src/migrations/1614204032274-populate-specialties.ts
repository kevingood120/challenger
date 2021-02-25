import Specialty from "src/specialty/specialty.entity";
import {getRepository, MigrationInterface, QueryRunner} from "typeorm";

export class populateSpecialties1614204032274 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const specialties = [
            {
                desc: 'ALERGOLOGIA'
            },
            {
                desc: 'ANGIOLOGIA',
            },
            {
                desc: 'BUCO MAXILO'
            },
            {
                desc: 'CARDIOLOGIA CLÍNICA'
            },
            {
                desc: 'CARDIOLOGIA INFANTIL'
            },
            {
                desc: 'CIRURGIA CABEÇA E PESCOÇO'
            },
            {
                desc: 'CIRURGIA CARDÍACA'
            },
            {
                desc: 'CIRURGIA DE TÓRAX'
            }
        ]

        const specialtyRepo = await getRepository(Specialty)
        await specialtyRepo.save(specialties)

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }
}
