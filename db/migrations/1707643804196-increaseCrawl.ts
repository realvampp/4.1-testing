import { MigrationInterface, QueryRunner } from "typeorm";

export class IncreaseCrawl1707643804196 implements MigrationInterface {
    name = 'IncreaseCrawl1707643804196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`film\` DROP COLUMN \`opening_crawl\``);
        await queryRunner.query(`ALTER TABLE \`film\` ADD \`opening_crawl\` longtext NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`film\` DROP COLUMN \`opening_crawl\``);
        await queryRunner.query(`ALTER TABLE \`film\` ADD \`opening_crawl\` varchar(255) NOT NULL`);
    }

}
