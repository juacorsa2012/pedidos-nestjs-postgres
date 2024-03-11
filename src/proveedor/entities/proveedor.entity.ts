import { Constant } from "src/config/constants"
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity("proveedores")
export class Proveedor {
  @PrimaryGeneratedColumn()
  id: number

  @Column("varchar", { length: Constant.LONGITUD_MAXIMA_NOMBRE_PROVEEDOR, unique: true })
  nombre: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}