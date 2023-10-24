import { MigrationInterface, QueryRunner } from 'typeorm'

export class IncludeColumnsDateTaskTableMigration1698115332618
  implements MigrationInterface
{
  name = 'IncludeColumnsDateTaskTableMigration1698115332618'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(`ALTER TABLE "tasks" ADD "deleted_at" TIMESTAMP`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "deleted_at"`)
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "updated_at"`)
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "created_at"`)
  }
}
