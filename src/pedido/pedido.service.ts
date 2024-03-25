import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common'
import { EstadoPedido, Pedido } from './entities/pedido.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PaginacionDto } from 'src/common/dtos/paginacion.dto'
import { Constant } from "../config/constants"
import { Message } from '../config/messages'
import { CreatePedidoDto } from './dto/create-pedido.dto'
import { ClienteService } from 'src/cliente/cliente.service'
import { ProductoService } from 'src/producto/producto.service'
import { ProveedorService } from 'src/proveedor/proveedor.service'
import { UpdatePedidoDto } from './dto/update-pedido.dto'

@Injectable()
export class PedidoService {
  private readonly logger = new Logger("PedidoService")

  constructor(
    @InjectRepository(Pedido) private readonly repo: Repository<Pedido>,
    private readonly clienteService: ClienteService,
    private readonly productoService: ProductoService,
    private readonly proveedorService: ProveedorService) {}

  obtenerPedidos(paginacionDto: PaginacionDto) {
    const { limite = Constant.LIMITE_PAGINACION_PEDIDOS, offset = 0 } = paginacionDto
    return this.repo.find({
      relations: ["cliente", "producto", "proveedor"],
      select: {
        cliente:  { id: true, nombre: true },
        producto: { id: true, nombre: true },
        proveedor:{ id: true, nombre: true }
      },
      take: limite,
      skip: offset
    })
  }

  async obtenerPedido(id: number) {
    try {
      return await this.repo.findOne({
        where: { id },
        relations: ["cliente", "producto", "proveedor"],
        select: {
          cliente:  { id: true, nombre: true },
          producto: { id: true, nombre: true },
          proveedor:{ id: true, nombre: true }
        }
      })
    } catch (error) {
      this.handleException(error)
    }
  }

  async registrarPedido(createPedidoDto: CreatePedidoDto) {    
    const { clienteId, productoId, proveedorId, modelo, referencia, oferta, contrato_menor, observaciones, parte, unidades, estado } = createPedidoDto
    
    const cliente = await this.clienteService.obtenerCliente(clienteId)

    if (!cliente) 
      throw new NotFoundException(`El cliente con id ${clienteId} no está registrado en la base de datos. Ha sido imposible registrar un nuevo pedido`)

    const producto = await this.productoService.obtenerProducto(productoId)
      
    if (!producto)
      throw new NotFoundException(`El producto con id ${productoId} no está registrado en la base de datos. Ha sido imposible registrar un nuevo pedido`)

    const proveedor = await this.proveedorService.obtenerProveedor(proveedorId)
    
    if (!proveedor)
      throw new NotFoundException(`El proveedor con id ${proveedorId} no está registrado en la base de datos. Ha sido imposible registrar un nuevo pedido`)
    
    const pedido = new Pedido()
    pedido.clienteId = clienteId
    pedido.productoId = productoId
    pedido.proveedorId = proveedorId
    pedido.modelo = modelo
    pedido.parte = parte
    pedido.oferta = oferta
    pedido.referencia = referencia
    pedido.observaciones = observaciones
    pedido.contrato_menor = contrato_menor
    pedido.unidades = unidades
    pedido.estado = estado as EstadoPedido

    return await this.repo.save(pedido) 
  }

  async actualizarPedido(id: number, updatePedidoDto: UpdatePedidoDto) {    
    const { clienteId, productoId, proveedorId, modelo, referencia, oferta, contrato_menor, observaciones, parte, unidades, estado } = updatePedidoDto
    
    const cliente = await this.clienteService.obtenerCliente(clienteId)

    if (!cliente) 
      throw new NotFoundException(`El cliente con id ${clienteId} no está registrado en la base de datos. Ha sido imposible actualizar el pedido solicitado`)

    const producto = await this.productoService.obtenerProducto(productoId)
      
    if (!producto)
      throw new NotFoundException(`El producto con id ${productoId} no está registrado en la base de datos. Ha sido imposible actualizar el pedido solicitado`)

    const proveedor = await this.proveedorService.obtenerProveedor(proveedorId)
    
    if (!proveedor)
      throw new NotFoundException(`El proveedor con id ${proveedorId} no está registrado en la base de datos. Ha sido imposible actualizar el pedido solicitado`)

    const pedido = new Pedido()
    pedido.clienteId = clienteId
    pedido.productoId  = productoId
    pedido.proveedorId = proveedorId
    pedido.modelo = modelo
    pedido.parte  = parte
    pedido.oferta = oferta
    pedido.referencia = referencia
    pedido.observaciones = observaciones
    pedido.contrato_menor = contrato_menor
    pedido.unidades = unidades
    pedido.estado = estado as EstadoPedido
    
    try {
      await this.repo.update(id, pedido)
    } catch (error) {
      this.handleException(error)
    }
  }

  async borrarPedido(id: number) {
    let pedido =  await this.repo.findOneBy({id})            

    if (!pedido)
      throw new NotFoundException(`El pedido con id ${id} no está registrado en la base de datos. Ha sido imposible borrar el pedido solicitado`)

    try {
      pedido = await this.repo.remove(pedido)
      return pedido      
    } catch (error) {
      this.handleException(error)
    }
  }

  private handleException(error: any) {    
    this.logger.error(error)   
    throw new InternalServerErrorException(Message.ERROR_GENERAL)
  }
}
