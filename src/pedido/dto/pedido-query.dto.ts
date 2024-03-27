import { Type } from "class-transformer"
import { IsIn, IsOptional, IsPositive, IsString, Min } from "class-validator"

export class PedidoQueryDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limite?: number
    
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  offset?: number

  @IsOptional()
  @IsString()
  sort?: string

  @IsOptional()
  @IsString()
  @IsIn(["DESC", "ASC", "desc", "asc"])
  order?: string

  @IsOptional()
  @IsString()
  @IsIn(["P", "F", "E", "PR"])
  estado?: string

  @IsOptional()
  @IsString()  
  cliente?: string

  @IsOptional()
  @IsString()  
  producto?: string

  @IsOptional()
  @IsString()  
  proveedor?: string
}