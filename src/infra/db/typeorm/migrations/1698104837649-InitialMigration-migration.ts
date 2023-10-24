import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitialMigrationMigration1698104837649
  implements MigrationInterface
{
  name = 'InitialMigrationMigration1698104837649'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "accounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_ee66de6cdc53993296d1ceb8aa0" UNIQUE ("email"), CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "log_errors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "stack" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d268ea9ac1074d41949daaae79d" PRIMARY KEY ("id"))`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "log_errors"`)
    await queryRunner.query(`DROP TABLE "accounts"`)
  }
}
