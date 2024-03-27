import { IsString, MaxLength, MinLength } from "class-validator"
import { Constant } from "../../config/constants"
import { Message } from "../../config/messages"

export class CreateProveedorDto {
  @IsString({message: Message.PROVEEDOR_NOMBRE_CADENA_TEXTO })
  @MinLength(Constant.LONGITUD_MINIMA_NOMBRE_PROVEEDOR, {message: Message.PROVEEDOR_NOMBRE_LONGITUD_MINIMA})
  @MaxLength(Constant.LONGITUD_MAXIMA_NOMBRE_PROVEEDOR, {message: Message.PRODUCTO_NOMBRE_LONGITUD_MAXIMA})
  readonly nombre: string;
}