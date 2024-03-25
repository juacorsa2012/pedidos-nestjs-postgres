import { Response } from "express"
import { Body, Controller, Delete, Get, Inject, NotFoundException, Param, ParseIntPipe, Post, Put, Query, Res } from '@nestjs/common'
import { PedidoService } from './pedido.service'
import { HttpResponseBadRequest, HttpResponseCreated, HttpResponseOk } from "../utils/response"
import { PaginacionDto } from "../common/dtos/paginacion.dto"
import { CreatePedidoDto } from "./dto/create-pedido.dto"
import { Message } from "../config/messages"
import { ClienteService } from "src/cliente/cliente.service"
import { ProductoService } from "src/producto/producto.service"
import { ProveedorService } from "src/proveedor/proveedor.service"
import { UpdatePedidoDto } from "./dto/update-pedido.dto"

@Controller("pedidos")
export class PedidoController {
  constructor(
    @Inject(ClienteService) private readonly clienteService: ClienteService,
    @Inject(ProductoService) private readonly productoService: ProductoService,
    @Inject(ProveedorService) private readonly proveedorService: ProveedorService,
    private readonly pedidoService: PedidoService) {}

  @Get()
  async obtenerClientes(@Res() res: Response, @Query() paginacionDto: PaginacionDto) {
    const pedidos = await this.pedidoService.obtenerPedidos(paginacionDto)
    HttpResponseOk(res, pedidos)
  }

  @Get(":id")  
  async obtenerPedido(@Res() res: Response, @Param("id", ParseIntPipe) id: number) {
    const pedido = await this.pedidoService.obtenerPedido(id)
    if (!pedido) throw new NotFoundException(`Pedido con id ${ id } no encontrado`)
    HttpResponseOk(res, pedido)
  }  

  @Post()
  async registrarPedido(@Res() res: Response, @Body() createPedidoDto: CreatePedidoDto) {
    const pedido = await this.pedidoService.registrarPedido(createPedidoDto)
    HttpResponseCreated(res, pedido, Message.PEDIDO_REGISTRADO)
  }

  @Delete(":id")
  async borrarPedido(@Res() res: Response, @Param("id", ParseIntPipe) id: number) {
    const pedido = await this.pedidoService.borrarPedido(id)
    HttpResponseOk(res, pedido, Message.PEDIDO_BORRADO)
  }  

  @Put(":id")
  async actualizarPedido(@Res() res: Response, @Param("id", ParseIntPipe) id: number, @Body() updatePedidoDto: UpdatePedidoDto) {
    await this.pedidoService.actualizarPedido(id, updatePedidoDto)
    HttpResponseOk(res, null, Message.PEDIDO_ACTUALIZADO)
  }  
}
