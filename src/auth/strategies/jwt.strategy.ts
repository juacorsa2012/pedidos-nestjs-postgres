import { Injectable, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { InjectRepository } from "@nestjs/typeorm"
import { ExtractJwt, Strategy } from "passport-jwt"
import { Repository } from "typeorm"
import { Usuario } from "../entities/usuario.entity"
import { JwtPayload } from "../interfaces/jwt-payload.interface"
import { Message } from "../../config/messages"

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    configService: ConfigService
    ) {
      super({
        secretOrKey: configService.get("JWT_SECRET"),
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      })
    }

    async validate(payload: JwtPayload): Promise<Usuario> {
      const { id } = payload
      const usuario = await this.usuarioRepository.findOneBy({id})

      if (!usuario)
        throw new UnauthorizedException(Message.USUARIO_TOKEN_NO_VALIDO)
            
      if (!usuario.activo) 
        throw new UnauthorizedException(Message.USUARIO_NO_ACTIVO)

      return usuario
    }
}