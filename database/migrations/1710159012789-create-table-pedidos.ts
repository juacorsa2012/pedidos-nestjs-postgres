import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTablePedidos1710159012789 implements MigrationInterface {
    name = 'CreateTablePedidos1710159012789'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."pedidos_estado_enum" AS ENUM('P', 'PR', 'E', 'F')`);
        await queryRunner.query(`CREATE TABLE "pedidos" ("id" SERIAL NOT NULL, "modelo" character varying(50), "referencia" character varying(10), "oferta" character varying(10), "contrato_menor" character varying(50), "observaciones" text, "unidades" integer NOT NULL DEFAULT '1', "parte" integer, "estado" "public"."pedidos_estado_enum" NOT NULL DEFAULT 'P', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "clienteId" integer, "productoId" integer, "proveedorId" integer, CONSTRAINT "PK_ebb5680ed29a24efdc586846725" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD CONSTRAINT "FK_485346a40b61bb8ae3a98f5400c" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD CONSTRAINT "FK_8b0d45d962a1a57bde4b0333d0a" FOREIGN KEY ("productoId") REFERENCES "productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD CONSTRAINT "FK_29677d22a12c75f41bf6194abd2" FOREIGN KEY ("proveedorId") REFERENCES "proveedores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pedidos" DROP CONSTRAINT "FK_29677d22a12c75f41bf6194abd2"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP CONSTRAINT "FK_8b0d45d962a1a57bde4b0333d0a"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP CONSTRAINT "FK_485346a40b61bb8ae3a98f5400c"`);
        await queryRunner.query(`DROP TABLE "pedidos"`);
        await queryRunner.query(`DROP TYPE "public"."pedidos_estado_enum"`);
    }

}
