import { MigrationInterface, QueryRunner } from 'typeorm'

export class IncludeTaskTableMigration1698114448258
  implements MigrationInterface
{
  name = 'IncludeTaskTableMigration1698114448258'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "progress" integer NOT NULL DEFAULT '0', "isCompleted" boolean NOT NULL DEFAULT false, "userId" uuid, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD CONSTRAINT "FK_166bd96559cb38595d392f75a35" FOREIGN KEY ("userId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tasks" DROP CONSTRAINT "FK_166bd96559cb38595d392f75a35"`
    )
    await queryRunner.query(`DROP TABLE "tasks"`)
  }
}
