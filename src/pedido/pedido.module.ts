import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { ClienteModule } from 'src/cliente/cliente.module';
import { ProductoModule } from 'src/producto/producto.module';
import { ProveedorModule } from 'src/proveedor/proveedor.module';

@Module({
  providers: [PedidoService],
  controllers: [PedidoController],
  imports: [TypeOrmModule.forFeature([Pedido]), ClienteModule, ProductoModule, ProveedorModule]
})
export class PedidoModule {}
