import { Response } from "express"
import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Query, Res } from "@nestjs/common"
import { HttpResponseCreated, HttpResponseOk } from "src/utils/response"
import { CreateProveedorDto, UpdateProveedorDto } from "./dto"
import { ProveedorService } from "./proveedor.service"
import { Message } from "src/config/messages"
import { PaginacionDto } from "src/common/dtos/paginacion.dto"

@Controller("proveedores")
export class ProveedorController {
  constructor(private readonly proveedorService: ProveedorService) {}

  @Get()
  async obtenerProveedores(@Res() res: Response, @Query() paginacionDto: PaginacionDto) {
    const proveedores = await this.proveedorService.obtenerProveedores(paginacionDto)
    HttpResponseOk(res, proveedores)
  }

  @Get(":id")  
  async obtenerProveedor(@Res() res: Response, @Param("id", ParseIntPipe) id: number) {
    const proveedor = await this.proveedorService.obtenerProveedor(id)
    
    if (!proveedor) throw new NotFoundException(`Proveedor con id ${ id } no encontrado`)
    
    HttpResponseOk(res, proveedor)
  }  

  @Post()
  async registrarProveedor(@Res() res: Response, @Body() createProveedorDto: CreateProveedorDto) {
    const proveedor = await this.proveedorService.registrarProveedor(createProveedorDto)
    HttpResponseCreated(res, proveedor, Message.PROVEEDOR_REGISTRADO)
  }

  @Patch(":id")
  async actualizarProveedor(@Res() res: Response, @Param("id", ParseIntPipe) id: number, @Body() updateProveedorDto: UpdateProveedorDto) {
    const proveedor = await this.proveedorService.actualizarProveedor(id, updateProveedorDto)
    HttpResponseOk(res, proveedor, Message.PROVEEDOR_ACTUALIZADO)
  }    
}
