import { Reflector } from "@nestjs/core"
import { CanActivate, ExecutionContext, Injectable, BadRequestException, ForbiddenException } from "@nestjs/common"
import { Observable } from "rxjs"
import { Usuario } from "../entities/usuario.entity"
import { META_ROLES } from "../decorators/rol-protected.decorator"
import { Message } from "../../config/messages"

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler())

    if (!validRoles) return true
    if (validRoles.length === 0) return true
    
    const req = context.switchToHttp().getRequest()
    const usuario = req.user as Usuario

    if (!usuario)
      throw new BadRequestException(Message.USUARIO_NO_ENCONTRADO)    
    
    for (const role of usuario.roles) {
      if (validRoles.includes(role)) {
        return true
      }
    }
    
    throw new ForbiddenException(
      `Usuario ${usuario.email} no dispone de los permisos suficientes. Necesita el rol [${ validRoles }]`
    )
  }
}