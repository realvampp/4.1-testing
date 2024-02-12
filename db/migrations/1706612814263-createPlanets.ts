import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePlanets1706612814263 implements MigrationInterface {
    name = 'CreatePlanets1706612814263'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`planet\` (\`url\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`rotation_period\` varchar(255) NOT NULL, \`orbital_period\` varchar(255) NOT NULL, \`diameter\` varchar(255) NOT NULL, \`climate\` varchar(255) NOT NULL, \`gravity\` varchar(255) NOT NULL, \`terrain\` varchar(255) NOT NULL, \`surface_water\` varchar(255) NOT NULL, \`population\` varchar(255) NOT NULL, \`residents\` varchar(255) NULL, \`films\` varchar(255) NULL, \`created\` varchar(255) NOT NULL, \`edited\` varchar(255) NOT NULL, PRIMARY KEY (\`url\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`planet\``);
    }

}
