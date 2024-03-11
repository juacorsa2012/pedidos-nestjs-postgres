import { IsString, MaxLength, MinLength } from "class-validator"
import { Constant } from "src/config/constants"

export class CreateProveedorDto {
  @IsString({message: "El nombre del proveedor debe ser una cadena de texto."})
  @MinLength(Constant.LONGITUD_MINIMA_NOMBRE_PROVEEDOR, {message: "El nombre del proveedor debe tener al menos 3 caracteres."})
  @MaxLength(Constant.LONGITUD_MAXIMA_NOMBRE_PROVEEDOR, {message: "El nombre del proveedor no puede superar los 100 caracteres."})
  nombre: string;
}