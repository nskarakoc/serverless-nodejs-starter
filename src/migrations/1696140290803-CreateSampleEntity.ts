import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSampleEntity1696140290803 implements MigrationInterface {
  name = 'CreateSampleEntity1696140290803';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`sample_entity\` (
                \`id\` varchar(36) NOT NULL,
                \`created_at\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
                \`updated_at\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
                \`name\` varchar(255) NOT NULL,
                INDEX \`IDX_b93bffe827f2144ea0b9ecac14\` (\`created_at\`),
                INDEX \`IDX_222a341af6fdcbeed17203533c\` (\`updated_at\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX \`IDX_222a341af6fdcbeed17203533c\` ON \`sample_entity\`
        `);
    await queryRunner.query(`
            DROP INDEX \`IDX_b93bffe827f2144ea0b9ecac14\` ON \`sample_entity\`
        `);
    await queryRunner.query(`
            DROP TABLE \`sample_entity\`
        `);
  }
}
