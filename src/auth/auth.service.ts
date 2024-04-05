import { Repository } from "typeorm"
import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt"
import { Usuario } from "./entities/usuario.entity"
import { CreateUsuarioDto, LoginUsuarioDto } from "./dto"
import { Message } from "../config/messages"
import { JwtPayload } from "./interfaces/jwt-payload.interface"

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ) {}

  async registrarUsuario(createUsuarioDto: CreateUsuarioDto) {
    try {
      const { password, ...data } = createUsuarioDto
      const usuario = this.usuarioRepository.create({
        ...data,
        password: bcrypt.hashSync(password, 10)
      })

      await this.usuarioRepository.save(usuario)
      delete usuario.password
      
      return {
        ...usuario,
        token: this.getJwtToken({id: usuario.id})
      }

    } catch (error) {
      this.handleException(error)
    }
  }
  
  async loginUsuario(loginUsuarioDto: LoginUsuarioDto) {
    const { password, email } = loginUsuarioDto

    const usuario = await this.usuarioRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true } 
    })

    if (!usuario)
      throw new UnauthorizedException(Message.USUARIO_CREDENCIALES_INCORRECTAS)

    if (!bcrypt.compareSync( password, usuario.password))
      throw new UnauthorizedException(Message.USUARIO_CREDENCIALES_INCORRECTAS)

    return {
      ...usuario,
      token: this.getJwtToken({id: usuario.id})
    }
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload)
  }

  private handleException(error: any): never {
    if (error.code === "23505")
      throw new BadRequestException(Message.USUARIO_YA_EXISTE)
    
    throw new InternalServerErrorException(Message.ERROR_GENERAL)
  }
}
