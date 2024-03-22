import { Constant } from "../../config/constants"
import { Pedido } from "../../pedido/entities/pedido.entity"

import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity("productos")
export class Producto {
  @PrimaryGeneratedColumn()
  id: number

  @Column("varchar", { length: Constant.LONGITUD_MAXIMA_NOMBRE_PRODUCTO, unique: true })
  nombre: string

  @OneToMany(() => Pedido, (pedido) => pedido.cliente)
  pedidos: Pedido[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}