import { Response } from "express"
import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Query, Res } from "@nestjs/common"
import { ClienteService } from "./cliente.service"
import { CreateClienteDto, UpdateClienteDto } from "./dto"
import { PaginacionDto } from "src/common/dtos/paginacion.dto"
import { Message } from "src/config/messages"
import { HttpResponseCreated, HttpResponseOk } from "src/utils/response"

@Controller("clientes")
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}
 
  @Get()  
  async obtenerClientes(@Res() res: Response, @Query() paginacionDto: PaginacionDto) {
    const { clientes, meta } = await this.clienteService.obtenerClientes(paginacionDto)    
    HttpResponseOk(res, clientes, meta)
  }
  
  @Get(":id")  
  async obtenerCliente(@Res() res: Response, @Param("id", ParseIntPipe) id: number) {
    const cliente = await this.clienteService.obtenerCliente(id)
    if (!cliente) throw new NotFoundException(`Cliente con id ${ id } no encontrado`)
    HttpResponseOk(res, cliente)
  }  
  
  @Post()
  async registrarCliente(@Res() res: Response, @Body() createClienteDto: CreateClienteDto) {
    const cliente = await this.clienteService.registrarCliente(createClienteDto)
    HttpResponseCreated(res, cliente, Message.CLIENTE_REGISTRADO)
  }

  @Patch(":id")
  async actualizarCliente(@Res() res: Response, @Param("id", ParseIntPipe) id: number, @Body() updateClienteDto: UpdateClienteDto) {
    const cliente = await this.clienteService.actualizarCliente(id, updateClienteDto)
    HttpResponseOk(res, cliente, Message.CLIENTE_ACTUALIZADO)
  }
}
