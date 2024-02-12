import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateImages1707041921179 implements MigrationInterface {
    name = 'CreateImages1707041921179'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`image\` (\`id\` int NOT NULL AUTO_INCREMENT, \`originName\` varchar(255) NOT NULL, \`peopleUrl\` varchar(255) NULL, \`planetUrl\` varchar(255) NULL, \`filmUrl\` varchar(255) NULL, \`specieUrl\` varchar(255) NULL, \`vehicleUrl\` varchar(255) NULL, \`starshipUrl\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`image\` ADD CONSTRAINT \`FK_4cccc0e2cf33c0cc33c1cb6c154\` FOREIGN KEY (\`peopleUrl\`) REFERENCES \`people\`(\`url\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`image\` ADD CONSTRAINT \`FK_04278c8ce6d41570a4617d01118\` FOREIGN KEY (\`planetUrl\`) REFERENCES \`planet\`(\`url\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`image\` ADD CONSTRAINT \`FK_43740c7e4fd02306bd3cb418d8c\` FOREIGN KEY (\`filmUrl\`) REFERENCES \`film\`(\`url\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`image\` ADD CONSTRAINT \`FK_f399b590c238078744dfd642a29\` FOREIGN KEY (\`specieUrl\`) REFERENCES \`specie\`(\`url\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`image\` ADD CONSTRAINT \`FK_282190b1d024d53f5048b6c3a2f\` FOREIGN KEY (\`vehicleUrl\`) REFERENCES \`vehicle\`(\`url\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`image\` ADD CONSTRAINT \`FK_d9bcd629425f620aec2f53b414b\` FOREIGN KEY (\`starshipUrl\`) REFERENCES \`starship\`(\`url\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`image\` DROP FOREIGN KEY \`FK_d9bcd629425f620aec2f53b414b\``);
        await queryRunner.query(`ALTER TABLE \`image\` DROP FOREIGN KEY \`FK_282190b1d024d53f5048b6c3a2f\``);
        await queryRunner.query(`ALTER TABLE \`image\` DROP FOREIGN KEY \`FK_f399b590c238078744dfd642a29\``);
        await queryRunner.query(`ALTER TABLE \`image\` DROP FOREIGN KEY \`FK_43740c7e4fd02306bd3cb418d8c\``);
        await queryRunner.query(`ALTER TABLE \`image\` DROP FOREIGN KEY \`FK_04278c8ce6d41570a4617d01118\``);
        await queryRunner.query(`ALTER TABLE \`image\` DROP FOREIGN KEY \`FK_4cccc0e2cf33c0cc33c1cb6c154\``);
        await queryRunner.query(`DROP TABLE \`image\``);
    }

}
