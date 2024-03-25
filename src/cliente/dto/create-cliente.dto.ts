import { IsString, MaxLength, MinLength } from "class-validator"
import { Constant } from "src/config/constants"

export class CreateClienteDto {
  @IsString({message: "El nombre del cliente debe ser una cadena de texto."})
  @MinLength(Constant.LONGITUD_MINIMA_NOMBRE_CLIENTE, {message: "El nombre del cliente debe tener al menos 3 caracteres."})
  @MaxLength(Constant.LONGITUD_MAXIMA_NOMBRE_CLIENTE, {message: "El nombre del cliente no puede superar los 100 caracteres."})
  readonly nombre: string
}