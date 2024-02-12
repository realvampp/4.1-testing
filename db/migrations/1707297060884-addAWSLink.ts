import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAWSLink1707297060884 implements MigrationInterface {
    name = 'AddAWSLink1707297060884'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`image\` CHANGE \`originName\` \`link\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`image\` DROP COLUMN \`link\``);
        await queryRunner.query(`ALTER TABLE \`image\` ADD \`link\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`image\` DROP COLUMN \`link\``);
        await queryRunner.query(`ALTER TABLE \`image\` ADD \`link\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`image\` CHANGE \`link\` \`originName\` varchar(255) NOT NULL`);
    }

}
