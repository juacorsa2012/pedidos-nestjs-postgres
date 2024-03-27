import { DataSource } from "typeorm"
import { Injectable } from "@nestjs/common"
import { Cliente } from "../cliente/entities/cliente.entity"
import { EstadoPedido, Pedido } from "../pedido/entities/pedido.entity"
import { Proveedor } from "../proveedor/entities/proveedor.entity"
import { Producto } from "../producto/entities/producto.entity"

@Injectable()
export class SeedService {
  constructor(private readonly dataSource: DataSource) {}

  async seed() {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    
    const clienteRepository = queryRunner.manager.getRepository(Cliente)
    const productoRepository = queryRunner.manager.getRepository(Producto)
    const proveedorRepository = queryRunner.manager.getRepository(Proveedor)
    const pedidoRepository = queryRunner.manager.getRepository(Pedido)

    const clientes = await clienteRepository.find()
    const productos = await productoRepository.find()
    const proveedores = await proveedorRepository.find()
    const pedidos = await pedidoRepository.find()
    
    await pedidoRepository.remove(pedidos)
    await clienteRepository.remove(clientes)
    await productoRepository.remove(productos)
    await proveedorRepository.remove(proveedores)

    const cliente1 = clienteRepository.create({ nombre: "Cliente 1" })
    const cliente2 = clienteRepository.create({ nombre: "Cliente 2" })
    const cliente3 = clienteRepository.create({ nombre: "Cliente 3" })
    const cliente4 = clienteRepository.create({ nombre: "Cliente 4" })
    const cliente5 = clienteRepository.create({ nombre: "Cliente 5" })
    
    const producto1 = productoRepository.create({ nombre: "Producto 1" })
    const producto2 = productoRepository.create({ nombre: "Producto 2" })
    const producto3 = productoRepository.create({ nombre: "Producto 3" })
    const producto4 = productoRepository.create({ nombre: "Producto 4" })
    const producto5 = productoRepository.create({ nombre: "Producto 5" })

    const proveedor1 = proveedorRepository.create({ nombre: "Proveedor 1" })
    const proveedor2 = proveedorRepository.create({ nombre: "Proveedor 2" })
    const proveedor3 = proveedorRepository.create({ nombre: "Proveedor 3" })
    const proveedor4 = proveedorRepository.create({ nombre: "Proveedor 4" })
    const proveedor5 = proveedorRepository.create({ nombre: "Proveedor 5" })   
    
    await clienteRepository.save([cliente1, cliente2, cliente3, cliente4, cliente5])
    await productoRepository.save([producto1, producto2, producto3, producto4, producto5])
    await proveedorRepository.save([proveedor1, proveedor2, proveedor3, proveedor4, proveedor5])

    const pedido1 = pedidoRepository.create({
      clienteId: cliente1.id,
      productoId: producto1.id,
      proveedorId: proveedor1.id,
      unidades: 1,
      estado: EstadoPedido.PEDIDO,
      observaciones: "Observaciones del pedido 1",
      oferta: "1",
      parte: 1,
      contrato_menor: "Contrato menor del pedido 1",
      referencia: "Ref 1",
      modelo: "Pedido 1"
    })

    const pedido2 = pedidoRepository.create({
      clienteId: cliente2.id,
      productoId: producto2.id,
      proveedorId: proveedor2.id,
      unidades: 10,
      estado: EstadoPedido.FACTURADO,
      observaciones: "Observaciones del pedido 2",
      oferta: "SIN OFERTA",
      parte: 2,
      contrato_menor: "Contrato menor del pedido 2",
      referencia: "Ref 2",
      modelo: "Pedido 2"
    })

    const pedido3 = pedidoRepository.create({
      clienteId: cliente3.id,
      productoId: producto3.id,
      proveedorId: proveedor3.id,
      unidades: 3,
      estado: EstadoPedido.FACTURADO,
      observaciones: "Observaciones del pedido 3",
      oferta: "3",
      parte: 3,
      contrato_menor: "Contrato menor del pedido 3",
      referencia: "Ref 3",
      modelo: "Pedido 3"
    })

    await pedidoRepository.save([pedido1, pedido2, pedido3])
    await queryRunner.release()    
  }
}
