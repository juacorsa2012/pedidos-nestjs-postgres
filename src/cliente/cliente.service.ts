import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateClienteDto } from './dto/create-cliente.dto'
import { PaginacionDto } from 'src/common/dtos/paginacion.dto'
import { UpdateClienteDto } from './dto/update-cliente.dto'
import { Message } from 'src/config/messages'
import { Constant } from 'src/config/constants'
import { Cliente } from './entities/cliente.entity'


@Injectable()
export class ClienteService {
  private readonly logger = new Logger("ClienteService")

  constructor(@InjectRepository(Cliente) private readonly clienteRepository: Repository<Cliente>) {}

  async registrarCliente(createClienteDto: CreateClienteDto) {    
    try {
      const cliente = this.clienteRepository.create(createClienteDto)
      return await this.clienteRepository.save(cliente)            
    } catch (error) {
      this.handleException(error)    
    }
  }

  async obtenerClientes(paginacionDto: PaginacionDto) {
    const { limite = Constant.LIMITE_PAGINACION_CLIENTES, offset = 0, sort="nombre", order = "ASC" } = paginacionDto

    const [clientes, total] = await this.clienteRepository.findAndCount({
      take: limite,
      skip: offset,
      order: { [sort]: order }
    })

    const meta = { limit: limite, offset, sort, order, total }
    return { clientes, meta }
  }

  async obtenerCliente(id: number) {
    try {
      return await this.clienteRepository.findOneBy({id})            

    } catch (error) {
      this.handleException(error)
    }
  }
  
  async actualizarCliente(id: number, updateClienteDto: UpdateClienteDto) {
    const cliente = await this.clienteRepository.findOneBy({id})
      
    if (!cliente) throw new NotFoundException(`Cliente con id ${ id } no encontrado`)

    cliente.nombre = updateClienteDto.nombre.trim()
    try {
      await this.clienteRepository.save(cliente)
      return cliente      
    } catch (error) {
      this.handleException(error)
    }
  }

  private handleException(error: any): never {
    if (error.code === "23505")
      throw new BadRequestException(Message.CLIENTE_YA_EXISTE)
    
    this.logger.error(error)    
    throw new InternalServerErrorException(Message.ERROR_GENERAL)
  }
}
