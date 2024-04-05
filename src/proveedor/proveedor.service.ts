import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common"
import { Proveedor } from "./entities/proveedor.entity"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { CreateProveedorDto } from "./dto/create-proveedor-dto"
import { PaginacionDto } from "src/common/dtos/paginacion.dto"
import { UpdateProveedorDto } from "./dto/update-proveedor-dto"
import { Message } from "src/config/messages"
import { Constant } from "src/config/constants"

@Injectable()
export class ProveedorService {
  private readonly logger = new Logger("ProveedorService")

  constructor(@InjectRepository(Proveedor) private readonly proveedorRepository: Repository<Proveedor>) {}

  async registrarProveedor(createProveedorDto: CreateProveedorDto) {    
    try {
      const proveedor = this.proveedorRepository.create(createProveedorDto)
      return await this.proveedorRepository.save(proveedor)
    } catch (error) {
      this.handleException(error)    
    }
  }

  async obtenerProveedores(paginacionDto: PaginacionDto) {
    const { limite = Constant.LIMITE_PAGINACION_PROVEEDORES, offset = 0, sort="nombre", order = "ASC" } = paginacionDto

    const [proveedores, total] = await this.proveedorRepository.find({
      take: limite,
      skip: offset,
      order: { [sort]: order }
    })

    const meta = { limit: limite, offset, sort, order, total }
    return { proveedores, meta }
  }

  async obtenerProveedor(id: number) {
    try {
      return await this.proveedorRepository.findOneBy({id})            

    } catch (error) {
      this.handleException(error)
    }
  }

  async actualizarProveedor(id: number, UpdateProveedorDto: UpdateProveedorDto) {
    const proveedor = await this.proveedorRepository.findOneBy({id})
      
    if (!proveedor) throw new NotFoundException(`Proveedor con id ${ id } no encontrado`)

    proveedor.nombre = UpdateProveedorDto.nombre.trim()
    try {
      await this.proveedorRepository.save(proveedor)
      return proveedor
    } catch (error) {
      this.handleException(error)
    }
  }

  async seed(n: number) {
    const proveedores: Partial<Proveedor>[] = []
    
    for (let i = 0; i < n; i++) {
      const proveedor = { "nombre": `Proveedor ` + i }
      proveedores.push(proveedor)
    }    

    try {
      await this.proveedorRepository.delete({})
      await this.proveedorRepository.save(proveedores)
    }
    catch (error) {
      this.handleException(error)  
    }
  }

  private handleException(error: any): never {
    if (error.code === "23505")
      throw new BadRequestException(Message.PROVEEDOR_YA_EXISTE)
      
      this.logger.error(error)    
      throw new InternalServerErrorException(Message.ERROR_GENERAL)
    }
}
