import { Body, Controller, Get, Post } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { CreateUsuarioDto, LoginUsuarioDto } from "./dto"
import { Usuario } from "./entities/usuario.entity"
import { GetUsuario } from "./decorators/get-usuario.decorator"
import { Auth } from "./decorators/auth.decorator"
import { ValidRoles } from "./interfaces/valid-roles"

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("registro")
  registrarUsuario(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.authService.registrarUsuario(createUsuarioDto)
  }

  @Post("login")
  loginUsuario(@Body() loginUsuarioDto: LoginUsuarioDto) {
    return this.authService.loginUsuario(loginUsuarioDto)
  }

  @Get('private') 
  @Auth(ValidRoles.user)
  private(@GetUsuario() usuario: Usuario) {
    return {
      ok: true,
      usuario
    }
  }
}
