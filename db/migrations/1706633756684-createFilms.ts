import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFilms1706633756684 implements MigrationInterface {
    name = 'CreateFilms1706633756684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`film\` (\`url\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`episode_id\` varchar(255) NOT NULL, \`opening_crawl\` varchar(255) NOT NULL, \`director\` varchar(255) NOT NULL, \`producer\` varchar(255) NOT NULL, \`release_date\` varchar(255) NOT NULL, \`characters\` varchar(255) NOT NULL, \`planets\` varchar(255) NOT NULL, \`starships\` varchar(255) NOT NULL, \`vehicles\` varchar(255) NOT NULL, \`species\` varchar(255) NOT NULL, \`created\` varchar(255) NOT NULL, \`edited\` varchar(255) NOT NULL, PRIMARY KEY (\`url\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`film\``);
    }

}
