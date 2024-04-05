import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUsuario1711990742312 implements MigrationInterface {
    name = 'CreateTableUsuario1711990742312'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "activo" boolean NOT NULL DEFAULT true, "roles" text array NOT NULL DEFAULT '{USER}', CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "UQ_cab1baef223012db5ee64a484da" UNIQUE ("password"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP CONSTRAINT "FK_485346a40b61bb8ae3a98f5400c"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP CONSTRAINT "FK_8b0d45d962a1a57bde4b0333d0a"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP CONSTRAINT "FK_29677d22a12c75f41bf6194abd2"`);
        await queryRunner.query(`ALTER TABLE "pedidos" ALTER COLUMN "clienteId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedidos" ALTER COLUMN "productoId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedidos" ALTER COLUMN "proveedorId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD CONSTRAINT "FK_485346a40b61bb8ae3a98f5400c" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD CONSTRAINT "FK_8b0d45d962a1a57bde4b0333d0a" FOREIGN KEY ("productoId") REFERENCES "productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD CONSTRAINT "FK_29677d22a12c75f41bf6194abd2" FOREIGN KEY ("proveedorId") REFERENCES "proveedores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pedidos" DROP CONSTRAINT "FK_29677d22a12c75f41bf6194abd2"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP CONSTRAINT "FK_8b0d45d962a1a57bde4b0333d0a"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP CONSTRAINT "FK_485346a40b61bb8ae3a98f5400c"`);
        await queryRunner.query(`ALTER TABLE "pedidos" ALTER COLUMN "proveedorId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedidos" ALTER COLUMN "productoId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedidos" ALTER COLUMN "clienteId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD CONSTRAINT "FK_29677d22a12c75f41bf6194abd2" FOREIGN KEY ("proveedorId") REFERENCES "proveedores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD CONSTRAINT "FK_8b0d45d962a1a57bde4b0333d0a" FOREIGN KEY ("productoId") REFERENCES "productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD CONSTRAINT "FK_485346a40b61bb8ae3a98f5400c" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
    }

}
