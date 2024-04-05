import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator"
import { Message } from "../../config/messages"

export class LoginUsuarioDto {
  @IsString()
  @IsEmail({}, { message: Message.USUARIO_EMAIL_INCORRECTO })
  email: string

  @IsString()
  @MinLength(6, { message: Message.USUARIO_PASSWORD_LONGITUD_MINIMA })
  @MaxLength(50, { message: Message.USUARIO_PASSWORD_LONGITUD_MAXIMA })
  @Matches(
    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: Message.USUARIO_PASSWORD_PATRON
  })
  password: string
}