import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableProveedores1710153603083 implements MigrationInterface {
    name = 'CreateTableProveedores1710153603083'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "proveedores" ("id" SERIAL NOT NULL, "nombre" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_2e65e98d5d91c6cab3abdcf7c27" UNIQUE ("nombre"), CONSTRAINT "PK_1dcf121f19f362fb1b4c0a493a9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "proveedores"`);
    }

}
