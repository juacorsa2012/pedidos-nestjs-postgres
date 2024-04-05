import { TypeOrmModule } from "@nestjs/typeorm"
import { Module } from "@nestjs/common"
import { ProveedorService } from "./proveedor.service"
import { ProveedorController } from "./proveedor.controller"
import { Proveedor } from "./entities/proveedor.entity"
import { AuthModule } from "src/auth/auth.module"

@Module({
  providers: [ProveedorService],
  controllers: [ProveedorController],
  imports: [TypeOrmModule.forFeature([Proveedor]), AuthModule],
  exports: [ProveedorService]
})
export class ProveedorModule {}
