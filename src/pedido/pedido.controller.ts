import { Response } from "express"
import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, Res } from '@nestjs/common'
import { PedidoService } from './pedido.service'
import { HttpResponseCreated, HttpResponseOk } from "../utils/response"
import { CreatePedidoDto, UpdatePedidoDto, PedidoQueryDto } from "./dto"
import { Message } from "../config/messages"


@Controller("pedidos")
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Get()
  async obtenerClientes(@Res() res: Response, @Query() pedidoQueryDto: PedidoQueryDto) {
    const pedidos = await this.pedidoService.obtenerPedidos(pedidoQueryDto)
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
