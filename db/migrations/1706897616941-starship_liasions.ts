import { MigrationInterface, QueryRunner } from "typeorm";

export class StarshipLiasions1706897616941 implements MigrationInterface {
    name = 'StarshipLiasions1706897616941'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`films_starships\` (\`filmUrl\` varchar(255) NOT NULL, \`starshipUrl\` varchar(255) NOT NULL, INDEX \`IDX_d0e0b2b8af636dcbb3ae68b48d\` (\`filmUrl\`), INDEX \`IDX_179bc09e4b381245a5854d6802\` (\`starshipUrl\`), PRIMARY KEY (\`filmUrl\`, \`starshipUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`people_starships\` (\`peopleUrl\` varchar(255) NOT NULL, \`starshipUrl\` varchar(255) NOT NULL, INDEX \`IDX_f0b372d1162fdb073d5dee41e5\` (\`peopleUrl\`), INDEX \`IDX_ea766e8604d4177108ec5a80e8\` (\`starshipUrl\`), PRIMARY KEY (\`peopleUrl\`, \`starshipUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`film\` DROP COLUMN \`starships\``);
        await queryRunner.query(`ALTER TABLE \`people\` DROP COLUMN \`starships\``);
        await queryRunner.query(`ALTER TABLE \`films_starships\` ADD CONSTRAINT \`FK_d0e0b2b8af636dcbb3ae68b48dc\` FOREIGN KEY (\`filmUrl\`) REFERENCES \`film\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_starships\` ADD CONSTRAINT \`FK_179bc09e4b381245a5854d6802a\` FOREIGN KEY (\`starshipUrl\`) REFERENCES \`starship\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`people_starships\` ADD CONSTRAINT \`FK_f0b372d1162fdb073d5dee41e54\` FOREIGN KEY (\`peopleUrl\`) REFERENCES \`people\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`people_starships\` ADD CONSTRAINT \`FK_ea766e8604d4177108ec5a80e8b\` FOREIGN KEY (\`starshipUrl\`) REFERENCES \`starship\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`people_starships\` DROP FOREIGN KEY \`FK_ea766e8604d4177108ec5a80e8b\``);
        await queryRunner.query(`ALTER TABLE \`people_starships\` DROP FOREIGN KEY \`FK_f0b372d1162fdb073d5dee41e54\``);
        await queryRunner.query(`ALTER TABLE \`films_starships\` DROP FOREIGN KEY \`FK_179bc09e4b381245a5854d6802a\``);
        await queryRunner.query(`ALTER TABLE \`films_starships\` DROP FOREIGN KEY \`FK_d0e0b2b8af636dcbb3ae68b48dc\``);
        await queryRunner.query(`ALTER TABLE \`people\` ADD \`starships\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`film\` ADD \`starships\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_ea766e8604d4177108ec5a80e8\` ON \`people_starships\``);
        await queryRunner.query(`DROP INDEX \`IDX_f0b372d1162fdb073d5dee41e5\` ON \`people_starships\``);
        await queryRunner.query(`DROP TABLE \`people_starships\``);
        await queryRunner.query(`DROP INDEX \`IDX_179bc09e4b381245a5854d6802\` ON \`films_starships\``);
        await queryRunner.query(`DROP INDEX \`IDX_d0e0b2b8af636dcbb3ae68b48d\` ON \`films_starships\``);
        await queryRunner.query(`DROP TABLE \`films_starships\``);
    }

}
