import { MigrationInterface, QueryRunner } from "typeorm";

export class TryLiasions1706872751780 implements MigrationInterface {
    name = 'TryLiasions1706872751780'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`films_people\` (\`filmUrl\` varchar(255) NOT NULL, \`peopleUrl\` varchar(255) NOT NULL, INDEX \`IDX_ffe238ab6d683d5f1ddf41e24d\` (\`filmUrl\`), INDEX \`IDX_a305ec96ea2d8f1c6c3eea7327\` (\`peopleUrl\`), PRIMARY KEY (\`filmUrl\`, \`peopleUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_planets\` (\`filmUrl\` varchar(255) NOT NULL, \`planetUrl\` varchar(255) NOT NULL, INDEX \`IDX_8e282af08437f31bc55c0c6f89\` (\`filmUrl\`), INDEX \`IDX_1af88f1393f755369eea213e1a\` (\`planetUrl\`), PRIMARY KEY (\`filmUrl\`, \`planetUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_species\` (\`filmUrl\` varchar(255) NOT NULL, \`specieUrl\` varchar(255) NOT NULL, INDEX \`IDX_4d5f37f9eadd676dfc79ee666e\` (\`filmUrl\`), INDEX \`IDX_7d2a337a0d8fa7a2b2330d4ed4\` (\`specieUrl\`), PRIMARY KEY (\`filmUrl\`, \`specieUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`people_species\` (\`peopleUrl\` varchar(255) NOT NULL, \`specieUrl\` varchar(255) NOT NULL, INDEX \`IDX_b98ba49b1334279c0a2c99d4d8\` (\`peopleUrl\`), INDEX \`IDX_d8b931babef09d5dd2147dbf3d\` (\`specieUrl\`), PRIMARY KEY (\`peopleUrl\`, \`specieUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`specie\` DROP COLUMN \`films\``);
        await queryRunner.query(`ALTER TABLE \`specie\` DROP COLUMN \`homeworld\``);
        await queryRunner.query(`ALTER TABLE \`specie\` DROP COLUMN \`people\``);
        await queryRunner.query(`ALTER TABLE \`film\` DROP COLUMN \`characters\``);
        await queryRunner.query(`ALTER TABLE \`film\` DROP COLUMN \`planets\``);
        await queryRunner.query(`ALTER TABLE \`film\` DROP COLUMN \`species\``);
        await queryRunner.query(`ALTER TABLE \`planet\` DROP COLUMN \`films\``);
        await queryRunner.query(`ALTER TABLE \`planet\` DROP COLUMN \`residents\``);
        await queryRunner.query(`ALTER TABLE \`people\` DROP COLUMN \`films\``);
        await queryRunner.query(`ALTER TABLE \`people\` DROP COLUMN \`homeworld\``);
        await queryRunner.query(`ALTER TABLE \`people\` DROP COLUMN \`species\``);
        await queryRunner.query(`ALTER TABLE \`vehicle\` DROP COLUMN \`films\``);
        await queryRunner.query(`ALTER TABLE \`vehicle\` DROP COLUMN \`pilots\``);
        await queryRunner.query(`ALTER TABLE \`starship\` DROP COLUMN \`films\``);
        await queryRunner.query(`ALTER TABLE \`starship\` DROP COLUMN \`pilots\``);
        await queryRunner.query(`ALTER TABLE \`specie\` ADD \`homeworldUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`people\` ADD \`homeworldUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`film\` CHANGE \`starships\` \`starships\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`film\` CHANGE \`vehicles\` \`vehicles\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`specie\` ADD CONSTRAINT \`FK_12d1141c4314ae12c8ea5e0b40c\` FOREIGN KEY (\`homeworldUrl\`) REFERENCES \`planet\`(\`url\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`people\` ADD CONSTRAINT \`FK_db5ab220b9854727011c353fa6c\` FOREIGN KEY (\`homeworldUrl\`) REFERENCES \`planet\`(\`url\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_people\` ADD CONSTRAINT \`FK_ffe238ab6d683d5f1ddf41e24d3\` FOREIGN KEY (\`filmUrl\`) REFERENCES \`film\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_people\` ADD CONSTRAINT \`FK_a305ec96ea2d8f1c6c3eea73277\` FOREIGN KEY (\`peopleUrl\`) REFERENCES \`people\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_planets\` ADD CONSTRAINT \`FK_8e282af08437f31bc55c0c6f894\` FOREIGN KEY (\`filmUrl\`) REFERENCES \`film\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_planets\` ADD CONSTRAINT \`FK_1af88f1393f755369eea213e1a4\` FOREIGN KEY (\`planetUrl\`) REFERENCES \`planet\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_species\` ADD CONSTRAINT \`FK_4d5f37f9eadd676dfc79ee666ea\` FOREIGN KEY (\`filmUrl\`) REFERENCES \`film\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_species\` ADD CONSTRAINT \`FK_7d2a337a0d8fa7a2b2330d4ed40\` FOREIGN KEY (\`specieUrl\`) REFERENCES \`specie\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`people_species\` ADD CONSTRAINT \`FK_b98ba49b1334279c0a2c99d4d8b\` FOREIGN KEY (\`peopleUrl\`) REFERENCES \`people\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`people_species\` ADD CONSTRAINT \`FK_d8b931babef09d5dd2147dbf3de\` FOREIGN KEY (\`specieUrl\`) REFERENCES \`specie\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`people_species\` DROP FOREIGN KEY \`FK_d8b931babef09d5dd2147dbf3de\``);
        await queryRunner.query(`ALTER TABLE \`people_species\` DROP FOREIGN KEY \`FK_b98ba49b1334279c0a2c99d4d8b\``);
        await queryRunner.query(`ALTER TABLE \`films_species\` DROP FOREIGN KEY \`FK_7d2a337a0d8fa7a2b2330d4ed40\``);
        await queryRunner.query(`ALTER TABLE \`films_species\` DROP FOREIGN KEY \`FK_4d5f37f9eadd676dfc79ee666ea\``);
        await queryRunner.query(`ALTER TABLE \`films_planets\` DROP FOREIGN KEY \`FK_1af88f1393f755369eea213e1a4\``);
        await queryRunner.query(`ALTER TABLE \`films_planets\` DROP FOREIGN KEY \`FK_8e282af08437f31bc55c0c6f894\``);
        await queryRunner.query(`ALTER TABLE \`films_people\` DROP FOREIGN KEY \`FK_a305ec96ea2d8f1c6c3eea73277\``);
        await queryRunner.query(`ALTER TABLE \`films_people\` DROP FOREIGN KEY \`FK_ffe238ab6d683d5f1ddf41e24d3\``);
        await queryRunner.query(`ALTER TABLE \`people\` DROP FOREIGN KEY \`FK_db5ab220b9854727011c353fa6c\``);
        await queryRunner.query(`ALTER TABLE \`specie\` DROP FOREIGN KEY \`FK_12d1141c4314ae12c8ea5e0b40c\``);
        await queryRunner.query(`ALTER TABLE \`film\` CHANGE \`vehicles\` \`vehicles\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`film\` CHANGE \`starships\` \`starships\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`people\` DROP COLUMN \`homeworldUrl\``);
        await queryRunner.query(`ALTER TABLE \`specie\` DROP COLUMN \`homeworldUrl\``);
        await queryRunner.query(`ALTER TABLE \`starship\` ADD \`pilots\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`starship\` ADD \`films\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`vehicle\` ADD \`pilots\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`vehicle\` ADD \`films\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`people\` ADD \`species\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`people\` ADD \`homeworld\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`people\` ADD \`films\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`planet\` ADD \`residents\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`planet\` ADD \`films\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`film\` ADD \`species\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`film\` ADD \`planets\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`film\` ADD \`characters\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`specie\` ADD \`people\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`specie\` ADD \`homeworld\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`specie\` ADD \`films\` varchar(255) NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_d8b931babef09d5dd2147dbf3d\` ON \`people_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_b98ba49b1334279c0a2c99d4d8\` ON \`people_species\``);
        await queryRunner.query(`DROP TABLE \`people_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_7d2a337a0d8fa7a2b2330d4ed4\` ON \`films_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_4d5f37f9eadd676dfc79ee666e\` ON \`films_species\``);
        await queryRunner.query(`DROP TABLE \`films_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_1af88f1393f755369eea213e1a\` ON \`films_planets\``);
        await queryRunner.query(`DROP INDEX \`IDX_8e282af08437f31bc55c0c6f89\` ON \`films_planets\``);
        await queryRunner.query(`DROP TABLE \`films_planets\``);
        await queryRunner.query(`DROP INDEX \`IDX_a305ec96ea2d8f1c6c3eea7327\` ON \`films_people\``);
        await queryRunner.query(`DROP INDEX \`IDX_ffe238ab6d683d5f1ddf41e24d\` ON \`films_people\``);
        await queryRunner.query(`DROP TABLE \`films_people\``);
    }

}
