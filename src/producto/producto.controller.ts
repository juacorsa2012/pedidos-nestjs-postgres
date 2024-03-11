import { Response } from 'express'
import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Query, Res } from '@nestjs/common';
import { HttpResponseCreated, HttpResponseOk } from 'src/utils/response';
import { CreateProductoDto } from './dto/create-producto-dto';
import { ProductoService } from './producto.service';
import { Message } from 'src/config/messages';
import { PaginacionDto } from 'src/common/dtos/paginacion.dto';
import { UpdateProductoDto } from './dto/update-producto-dto';

@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Get()
  async obtenerProductos(@Res() res: Response, @Query() paginacionDto: PaginacionDto) {
    const productos = await this.productoService.obtenerProductos(paginacionDto)
    HttpResponseOk(res, productos)
  }

  @Get(":id")  
  async obtenerCliente(@Res() res: Response, @Param("id", ParseIntPipe) id: number) {
    const producto = await this.productoService.obtenerProducto(id)
    
    if (!producto) throw new NotFoundException(`Producto con id ${ id } no encontrado`)
    
    HttpResponseOk(res, producto)
  }  
  
  @Post()
  async registrarProducto(@Res() res: Response, @Body() createProductoDto: CreateProductoDto) {
    const producto = await this.productoService.registrarProducto(createProductoDto)
    HttpResponseCreated(res, producto, Message.PRODUCTO_REGISTRADO)
  }

  @Patch(":id")
  async actualizarProducto(@Res() res: Response, @Param("id", ParseIntPipe) id: number, @Body() updateProductoDto: UpdateProductoDto) {
    const producto = await this.productoService.actualizarProducto(id, updateProductoDto)
    HttpResponseOk(res, producto, Message.PRODUCTO_ACTUALIZADO)
  }  
}
