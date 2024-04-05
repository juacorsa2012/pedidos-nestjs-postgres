import { Module } from "@nestjs/common"
import { ProductoController } from "./producto.controller"
import { ProductoService } from "./producto.service"
import { Producto } from "./entities/producto.entity"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AuthModule } from "src/auth/auth.module"

@Module({
  controllers: [ProductoController],
  providers: [ProductoService],
  imports: [TypeOrmModule.forFeature([Producto]), AuthModule],
  exports: [ProductoService]
})
export class ProductoModule {}
