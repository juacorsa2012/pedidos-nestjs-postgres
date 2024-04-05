import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common"
import { Message } from "../../config/messages"

export const GetUsuario = createParamDecorator(
    ( data: string, ctx: ExecutionContext ) => {
      const req = ctx.switchToHttp().getRequest()
      const usuario = req.user

      if (!usuario)
        throw new InternalServerErrorException(Message.USUARIO_NO_ENCONTRADO)
        
      return (!data) ? usuario : usuario[data]        
    }
)