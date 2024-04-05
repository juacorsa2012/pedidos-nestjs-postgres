import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { dataSourceOptions } from "database/data-source"
import { ConfigModule } from "@nestjs/config"
import { ClienteModule } from "./cliente/cliente.module"
import { ProductoModule } from "./producto/producto.module"
import { ProveedorModule } from "./proveedor/proveedor.module"
import { CommonModule } from "./common/common.module"
import { PedidoModule } from "./pedido/pedido.module"
import { SeedModule } from "./seed/seed.module"
import { AuthModule } from "./auth/auth.module"

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
    ClienteModule,
    ProductoModule,
    ProveedorModule,
    CommonModule,
    PedidoModule,
    SeedModule,
    AuthModule, 
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
