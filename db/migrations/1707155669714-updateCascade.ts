import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCascade1707155669714 implements MigrationInterface {
    name = 'UpdateCascade1707155669714'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`films_people\` DROP FOREIGN KEY \`FK_a305ec96ea2d8f1c6c3eea73277\``);
        await queryRunner.query(`ALTER TABLE \`films_planets\` DROP FOREIGN KEY \`FK_1af88f1393f755369eea213e1a4\``);
        await queryRunner.query(`ALTER TABLE \`films_starships\` DROP FOREIGN KEY \`FK_179bc09e4b381245a5854d6802a\``);
        await queryRunner.query(`ALTER TABLE \`films_vehicles\` DROP FOREIGN KEY \`FK_64813753a3bab86b1680e311eef\``);
        await queryRunner.query(`ALTER TABLE \`films_species\` DROP FOREIGN KEY \`FK_7d2a337a0d8fa7a2b2330d4ed40\``);
        await queryRunner.query(`ALTER TABLE \`people_species\` DROP FOREIGN KEY \`FK_d8b931babef09d5dd2147dbf3de\``);
        await queryRunner.query(`ALTER TABLE \`people_vehicles\` DROP FOREIGN KEY \`FK_b8e6c2a40aa6f34de9934e26dec\``);
        await queryRunner.query(`ALTER TABLE \`people_starships\` DROP FOREIGN KEY \`FK_ea766e8604d4177108ec5a80e8b\``);
        await queryRunner.query(`ALTER TABLE \`films_people\` ADD CONSTRAINT \`FK_a305ec96ea2d8f1c6c3eea73277\` FOREIGN KEY (\`peopleUrl\`) REFERENCES \`people\`(\`url\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_planets\` ADD CONSTRAINT \`FK_1af88f1393f755369eea213e1a4\` FOREIGN KEY (\`planetUrl\`) REFERENCES \`planet\`(\`url\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_starships\` ADD CONSTRAINT \`FK_179bc09e4b381245a5854d6802a\` FOREIGN KEY (\`starshipUrl\`) REFERENCES \`starship\`(\`url\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_vehicles\` ADD CONSTRAINT \`FK_64813753a3bab86b1680e311eef\` FOREIGN KEY (\`vehicleUrl\`) REFERENCES \`vehicle\`(\`url\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_species\` ADD CONSTRAINT \`FK_7d2a337a0d8fa7a2b2330d4ed40\` FOREIGN KEY (\`specieUrl\`) REFERENCES \`specie\`(\`url\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`people_species\` ADD CONSTRAINT \`FK_d8b931babef09d5dd2147dbf3de\` FOREIGN KEY (\`specieUrl\`) REFERENCES \`specie\`(\`url\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`people_vehicles\` ADD CONSTRAINT \`FK_b8e6c2a40aa6f34de9934e26dec\` FOREIGN KEY (\`vehicleUrl\`) REFERENCES \`vehicle\`(\`url\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`people_starships\` ADD CONSTRAINT \`FK_ea766e8604d4177108ec5a80e8b\` FOREIGN KEY (\`starshipUrl\`) REFERENCES \`starship\`(\`url\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`people_starships\` DROP FOREIGN KEY \`FK_ea766e8604d4177108ec5a80e8b\``);
        await queryRunner.query(`ALTER TABLE \`people_vehicles\` DROP FOREIGN KEY \`FK_b8e6c2a40aa6f34de9934e26dec\``);
        await queryRunner.query(`ALTER TABLE \`people_species\` DROP FOREIGN KEY \`FK_d8b931babef09d5dd2147dbf3de\``);
        await queryRunner.query(`ALTER TABLE \`films_species\` DROP FOREIGN KEY \`FK_7d2a337a0d8fa7a2b2330d4ed40\``);
        await queryRunner.query(`ALTER TABLE \`films_vehicles\` DROP FOREIGN KEY \`FK_64813753a3bab86b1680e311eef\``);
        await queryRunner.query(`ALTER TABLE \`films_starships\` DROP FOREIGN KEY \`FK_179bc09e4b381245a5854d6802a\``);
        await queryRunner.query(`ALTER TABLE \`films_planets\` DROP FOREIGN KEY \`FK_1af88f1393f755369eea213e1a4\``);
        await queryRunner.query(`ALTER TABLE \`films_people\` DROP FOREIGN KEY \`FK_a305ec96ea2d8f1c6c3eea73277\``);
        await queryRunner.query(`ALTER TABLE \`people_starships\` ADD CONSTRAINT \`FK_ea766e8604d4177108ec5a80e8b\` FOREIGN KEY (\`starshipUrl\`) REFERENCES \`starship\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`people_vehicles\` ADD CONSTRAINT \`FK_b8e6c2a40aa6f34de9934e26dec\` FOREIGN KEY (\`vehicleUrl\`) REFERENCES \`vehicle\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`people_species\` ADD CONSTRAINT \`FK_d8b931babef09d5dd2147dbf3de\` FOREIGN KEY (\`specieUrl\`) REFERENCES \`specie\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_species\` ADD CONSTRAINT \`FK_7d2a337a0d8fa7a2b2330d4ed40\` FOREIGN KEY (\`specieUrl\`) REFERENCES \`specie\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_vehicles\` ADD CONSTRAINT \`FK_64813753a3bab86b1680e311eef\` FOREIGN KEY (\`vehicleUrl\`) REFERENCES \`vehicle\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_starships\` ADD CONSTRAINT \`FK_179bc09e4b381245a5854d6802a\` FOREIGN KEY (\`starshipUrl\`) REFERENCES \`starship\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_planets\` ADD CONSTRAINT \`FK_1af88f1393f755369eea213e1a4\` FOREIGN KEY (\`planetUrl\`) REFERENCES \`planet\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_people\` ADD CONSTRAINT \`FK_a305ec96ea2d8f1c6c3eea73277\` FOREIGN KEY (\`peopleUrl\`) REFERENCES \`people\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
