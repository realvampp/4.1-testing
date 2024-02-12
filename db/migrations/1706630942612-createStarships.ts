import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStarships1706630942612 implements MigrationInterface {
    name = 'CreateStarships1706630942612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`starship\` (\`url\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`cost_in_credits\` varchar(255) NOT NULL, \`length\` varchar(255) NOT NULL, \`max_atmosphering_speed\` varchar(255) NOT NULL, \`crew\` varchar(255) NOT NULL, \`passengers\` varchar(255) NOT NULL, \`cargo_capacity\` varchar(255) NOT NULL, \`consumables\` varchar(255) NOT NULL, \`hyperdrive_rating\` varchar(255) NOT NULL, \`MGLT\` varchar(255) NOT NULL, \`starship_class\` varchar(255) NOT NULL, \`pilots\` varchar(255) NULL, \`films\` varchar(255) NULL, \`created\` varchar(255) NOT NULL, \`edited\` varchar(255) NOT NULL, PRIMARY KEY (\`url\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`starship\``);
    }

}
