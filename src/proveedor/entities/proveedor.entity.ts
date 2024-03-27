import { IsIn, IsOptional, IsString } from "class-validator"
import { Constant } from "../../config/constants"
import { Pedido } from "../../pedido/entities/pedido.entity"
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity("proveedores")
export class Proveedor {
  @PrimaryGeneratedColumn()
  id: number

  @Column("varchar", { length: Constant.LONGITUD_MAXIMA_NOMBRE_PROVEEDOR, unique: true })
  nombre: string

  @OneToMany(() => Pedido, (pedido) => pedido.cliente)
  pedidos: Pedido[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @IsOptional()
  @IsString()
  @IsIn(["nombre", "created_at"])
  sort?: string

  @IsOptional()
  @IsString()
  @IsIn(["DESC", "ASC", "desc", "asc"])
  order?: string
}