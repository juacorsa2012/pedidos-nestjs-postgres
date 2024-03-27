import { IsString, MaxLength, MinLength } from "class-validator"
import { Constant } from "../../config/constants"
import { Message } from "../../config/messages"

export class CreateProductoDto {
  @IsString({message: Message.PRODUCTO_NOMBRE_CADENA_TEXTO})
  @MinLength(Constant.LONGITUD_MINIMA_NOMBRE_PRODUCTO, {message: Message.PRODUCTO_NOMBRE_LONGITUD_MINIMA})
  @MaxLength(Constant.LONGITUD_MAXIMA_NOMBRE_PRODUCTO, {message: Message.PRODUCTO_NOMBRE_LONGITUD_MAXIMA })
  readonly nombre: string;
}