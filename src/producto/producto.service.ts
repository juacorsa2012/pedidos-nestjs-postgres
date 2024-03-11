import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common'
import { Producto } from './entities/producto.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateProductoDto } from './dto/create-producto-dto'
import { PaginacionDto } from 'src/common/dtos/paginacion.dto'
import { UpdateProductoDto } from './dto/update-producto-dto'
import { Message } from 'src/config/messages'
import { Constant } from 'src/config/constants'

@Injectable()
export class ProductoService {
  private readonly logger = new Logger("ProductoService")

  constructor(@InjectRepository(Producto) private readonly productoRepository: Repository<Producto>) {}

  async registrarProducto(createProductoDto: CreateProductoDto) {    
    try {
      const producto = this.productoRepository.create(createProductoDto)
      return await this.productoRepository.save(producto)
    } catch (error) {
      this.handleException(error)    
    }
  }

  obtenerProductos(paginacionDto: PaginacionDto) {
    const { limite = Constant.LIMITE_PAGINACION_PRODUCTOS, offset = 0 } = paginacionDto

    return this.productoRepository.find({
      take: limite,
      skip: offset
    })
  }

  async obtenerProducto(id: number) {
    try {
      return await this.productoRepository.findOneBy({id})            

    } catch (error) {
      this.handleException(error)
    }
  }
  
  async actualizarProducto(id: number, updateProductoDto: UpdateProductoDto) {
    const producto = await this.productoRepository.findOneBy({ id })
      
    if (!producto) throw new NotFoundException(`Producto con id ${ id } no encontrado`)

    producto.nombre = updateProductoDto.nombre.trim()
    try {
      await this.productoRepository.save(producto)
      return producto
    } catch (error) {
      this.handleException(error)
    }
  }

  private handleException(error: any) {
    if (error.code === "23505")
      throw new BadRequestException(Message.PRODUCTO_YA_EXISTE)
      
    this.logger.error(error)    
    throw new InternalServerErrorException(Message.ERROR_GENERAL)
  }
}
