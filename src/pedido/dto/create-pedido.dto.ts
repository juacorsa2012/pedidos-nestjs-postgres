import { IsString, IsInt, IsOptional, IsEnum, Min, IsPositive, IsIn } from "class-validator"

export class CreatePedidoDto {
  @IsInt()
  clienteId: number

  @IsInt()
  productoId: number

  @IsInt()
  proveedorId: number

  @IsString()
  @IsOptional()
  modelo: string

  @IsString()
  @IsOptional()
  referencia: string

  @IsString()
  @IsOptional()
  oferta: string
  
  @IsString()
  @IsOptional()
  contrato_menor: string  
  
  @IsString()
  @IsOptional()
  observaciones: string

  @Min(1, { message: "El número de unidades debe ser un número positivo mayor o igual a 1" })
  @IsPositive({ message: "El número de unidades debe ser un número positivo" })
  unidades: number
  
  @IsInt({ message: "El parte debe ser un número entero" })
  @IsOptional()
  parte: number
    
  @IsString()
  @IsIn(["P", "F,", "PR", "E"], {message: "Estado no válido"})
  estado: string
}
