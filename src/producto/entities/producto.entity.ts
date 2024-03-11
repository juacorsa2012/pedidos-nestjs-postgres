import { Constant } from "src/config/constants"
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity("productos")
export class Producto {
  @PrimaryGeneratedColumn()
  id: number

  @Column("varchar", { length: Constant.LONGITUD_MAXIMA_NOMBRE_PRODUCTO, unique: true })
  nombre: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}