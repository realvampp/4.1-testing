import { MigrationInterface, QueryRunner } from 'typeorm'

export class Create1706354687604 implements MigrationInterface {
  name = 'Create1706354687604'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`people\`
                             (
                                 \`url\`        varchar(255) NOT NULL,
                                 \`name\`       varchar(255) NOT NULL,
                                 \`height\`     varchar(255) NOT NULL,
                                 \`mass\`       varchar(255) NOT NULL,
                                 \`hair_color\` varchar(255) NOT NULL,
                                 \`skin_color\` varchar(255) NOT NULL,
                                 \`eye_color\`  varchar(255) NOT NULL,
                                 \`birth_year\` varchar(255) NOT NULL,
                                 \`gender\`     varchar(255) NOT NULL,
                                 \`homeworld\`  varchar(255) NOT NULL,
                                 \`films\`      varchar(255) NOT NULL,
                                 \`species\`    varchar(255) NOT NULL,
                                 \`vehicles\`   varchar(255) NOT NULL,
                                 \`starships\`  varchar(255) NOT NULL,
                                 \`created\`    varchar(255) NOT NULL,
                                 \`edited\`     varchar(255) NOT NULL,
                                 PRIMARY KEY (\`url\`)
                             ) ENGINE = InnoDB`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`people\``)
  }
}
