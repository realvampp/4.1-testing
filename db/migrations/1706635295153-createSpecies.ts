import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSpecies1706635295153 implements MigrationInterface {
    name = 'CreateSpecies1706635295153'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`specie\` (\`url\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`classification\` varchar(255) NOT NULL, \`designation\` varchar(255) NOT NULL, \`average_height\` varchar(255) NOT NULL, \`skin_colors\` varchar(255) NOT NULL, \`hair_colors\` varchar(255) NOT NULL, \`eye_colors\` varchar(255) NOT NULL, \`average_lifespan\` varchar(255) NOT NULL, \`homeworld\` varchar(255) NULL, \`language\` varchar(255) NOT NULL, \`people\` varchar(255) NULL, \`films\` varchar(255) NULL, \`created\` varchar(255) NOT NULL, \`edited\` varchar(255) NOT NULL, PRIMARY KEY (\`url\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`film\` CHANGE \`characters\` \`characters\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`film\` CHANGE \`planets\` \`planets\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`film\` CHANGE \`starships\` \`starships\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`film\` CHANGE \`vehicles\` \`vehicles\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`film\` CHANGE \`species\` \`species\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`film\` CHANGE \`species\` \`species\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`film\` CHANGE \`vehicles\` \`vehicles\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`film\` CHANGE \`starships\` \`starships\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`film\` CHANGE \`planets\` \`planets\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`film\` CHANGE \`characters\` \`characters\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP TABLE \`specie\``);
    }

}
