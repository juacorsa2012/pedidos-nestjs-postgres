import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableCliente1710145284327 implements MigrationInterface {
    name = 'CreateTableCliente1710145284327'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cliente" ("id" SERIAL NOT NULL, "nombre" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_3aa405575a194aedb44a592bc14" UNIQUE ("nombre"), CONSTRAINT "PK_18990e8df6cf7fe71b9dc0f5f39" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "cliente"`);
    }

}
