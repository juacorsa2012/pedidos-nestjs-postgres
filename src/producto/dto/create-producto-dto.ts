import { IsString, MaxLength, MinLength } from "class-validator"
import { Constant } from "src/config/constants"

export class CreateProductoDto {
  @IsString({message: "El nombre del producto debe ser una cadena de texto."})
  @MinLength(Constant.LONGITUD_MINIMA_NOMBRE_PRODUCTO, {message: "El nombre del producto debe tener al menos 3 caracteres."})
  @MaxLength(Constant.LONGITUD_MAXIMA_NOMBRE_PRODUCTO, {message: "El nombre del producto no puede superar los 100 caracteres."})
  nombre: string;
}