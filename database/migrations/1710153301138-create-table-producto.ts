import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableProducto1710153301138 implements MigrationInterface {
    name = 'CreateTableProducto1710153301138'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "producto" ("id" SERIAL NOT NULL, "nombre" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_d86d179360134b4b74bda750664" UNIQUE ("nombre"), CONSTRAINT "PK_5be023b11909fe103e24c740c7d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "producto"`);
    }

}
