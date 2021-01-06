import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUser1609625831503 implements MigrationInterface {
  name = 'AddUser1609625831503';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_account" ("id" SERIAL NOT NULL, "auth_id" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "UQ_6fd8a546411f59a188f8f5e4083" UNIQUE ("auth_id"), CONSTRAINT "UQ_56a0e4bcec2b5411beafa47ffa5" UNIQUE ("email"), CONSTRAINT "PK_6acfec7285fdf9f463462de3e9f" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user_account"`);
  }
}
