import { MigrationInterface, QueryRunner } from "typeorm";

export class VehicleLiasions1706898515910 implements MigrationInterface {
    name = 'VehicleLiasions1706898515910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`films_vehicles\` (\`filmUrl\` varchar(255) NOT NULL, \`vehicleUrl\` varchar(255) NOT NULL, INDEX \`IDX_30e8f82e8a03400bb13f8674ed\` (\`filmUrl\`), INDEX \`IDX_64813753a3bab86b1680e311ee\` (\`vehicleUrl\`), PRIMARY KEY (\`filmUrl\`, \`vehicleUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`people_vehicles\` (\`peopleUrl\` varchar(255) NOT NULL, \`vehicleUrl\` varchar(255) NOT NULL, INDEX \`IDX_b6518c57f76ae19d869fc5830a\` (\`peopleUrl\`), INDEX \`IDX_b8e6c2a40aa6f34de9934e26de\` (\`vehicleUrl\`), PRIMARY KEY (\`peopleUrl\`, \`vehicleUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`film\` DROP COLUMN \`vehicles\``);
        await queryRunner.query(`ALTER TABLE \`people\` DROP COLUMN \`vehicles\``);
        await queryRunner.query(`ALTER TABLE \`films_vehicles\` ADD CONSTRAINT \`FK_30e8f82e8a03400bb13f8674ed8\` FOREIGN KEY (\`filmUrl\`) REFERENCES \`film\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_vehicles\` ADD CONSTRAINT \`FK_64813753a3bab86b1680e311eef\` FOREIGN KEY (\`vehicleUrl\`) REFERENCES \`vehicle\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`people_vehicles\` ADD CONSTRAINT \`FK_b6518c57f76ae19d869fc5830ad\` FOREIGN KEY (\`peopleUrl\`) REFERENCES \`people\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`people_vehicles\` ADD CONSTRAINT \`FK_b8e6c2a40aa6f34de9934e26dec\` FOREIGN KEY (\`vehicleUrl\`) REFERENCES \`vehicle\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`people_vehicles\` DROP FOREIGN KEY \`FK_b8e6c2a40aa6f34de9934e26dec\``);
        await queryRunner.query(`ALTER TABLE \`people_vehicles\` DROP FOREIGN KEY \`FK_b6518c57f76ae19d869fc5830ad\``);
        await queryRunner.query(`ALTER TABLE \`films_vehicles\` DROP FOREIGN KEY \`FK_64813753a3bab86b1680e311eef\``);
        await queryRunner.query(`ALTER TABLE \`films_vehicles\` DROP FOREIGN KEY \`FK_30e8f82e8a03400bb13f8674ed8\``);
        await queryRunner.query(`ALTER TABLE \`people\` ADD \`vehicles\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`film\` ADD \`vehicles\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_b8e6c2a40aa6f34de9934e26de\` ON \`people_vehicles\``);
        await queryRunner.query(`DROP INDEX \`IDX_b6518c57f76ae19d869fc5830a\` ON \`people_vehicles\``);
        await queryRunner.query(`DROP TABLE \`people_vehicles\``);
        await queryRunner.query(`DROP INDEX \`IDX_64813753a3bab86b1680e311ee\` ON \`films_vehicles\``);
        await queryRunner.query(`DROP INDEX \`IDX_30e8f82e8a03400bb13f8674ed\` ON \`films_vehicles\``);
        await queryRunner.query(`DROP TABLE \`films_vehicles\``);
    }

}
