import {MigrationInterface, QueryRunner} from "typeorm";

export class createTables1614203943111 implements MigrationInterface {
    name = 'createTables1614203943111'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createDatabase('hospitalApp', true)
        await queryRunner.query("CREATE TABLE `specialty` (`id` varchar(36) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, `desc` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `medic` (`id` varchar(36) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, `name` varchar(120) NOT NULL, `crm` char(7) NOT NULL, `phone` char(10) NOT NULL, `cellPhone` char(11) NOT NULL, `zipcode` char(8) NOT NULL, `street` varchar(255) NOT NULL, `neighborhood` varchar(255) NOT NULL, `addressNumber` varchar(255) NOT NULL, `state` char(2) NOT NULL, `city` varchar(255) NOT NULL, `complement` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `medic_specialties_specialty` (`medicId` varchar(36) NOT NULL, `specialtyId` varchar(36) NOT NULL, INDEX `IDX_e3a253b46780606d87e3f52d52` (`medicId`), INDEX `IDX_cb51f240f233419a7374fecb1d` (`specialtyId`), PRIMARY KEY (`medicId`, `specialtyId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `medic_specialties_specialty` ADD CONSTRAINT `FK_e3a253b46780606d87e3f52d525` FOREIGN KEY (`medicId`) REFERENCES `medic`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `medic_specialties_specialty` ADD CONSTRAINT `FK_cb51f240f233419a7374fecb1dd` FOREIGN KEY (`specialtyId`) REFERENCES `specialty`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `medic_specialties_specialty` DROP FOREIGN KEY `FK_cb51f240f233419a7374fecb1dd`");
        await queryRunner.query("ALTER TABLE `medic_specialties_specialty` DROP FOREIGN KEY `FK_e3a253b46780606d87e3f52d525`");
        await queryRunner.query("DROP INDEX `IDX_cb51f240f233419a7374fecb1d` ON `medic_specialties_specialty`");
        await queryRunner.query("DROP INDEX `IDX_e3a253b46780606d87e3f52d52` ON `medic_specialties_specialty`");
        await queryRunner.query("DROP TABLE `medic_specialties_specialty`");
        await queryRunner.query("DROP TABLE `medic`");
        await queryRunner.query("DROP TABLE `specialty`");
        await queryRunner.dropDatabase('hospitalApp', true)
    }
    
}
