import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePeopleNullable1706432603449 implements MigrationInterface {
    name = 'UpdatePeopleNullable1706432603449'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`people\` CHANGE \`homeworld\` \`homeworld\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`people\` CHANGE \`films\` \`films\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`people\` CHANGE \`species\` \`species\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`people\` CHANGE \`vehicles\` \`vehicles\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`people\` CHANGE \`starships\` \`starships\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`people\` CHANGE \`starships\` \`starships\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`people\` CHANGE \`vehicles\` \`vehicles\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`people\` CHANGE \`species\` \`species\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`people\` CHANGE \`films\` \`films\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`people\` CHANGE \`homeworld\` \`homeworld\` varchar(255) NOT NULL`);
    }

}
