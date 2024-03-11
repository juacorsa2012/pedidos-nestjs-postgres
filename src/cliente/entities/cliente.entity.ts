import { Constant } from "src/config/constants"
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity("clientes")
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number

  @Column("varchar", { length: Constant.LONGITUD_MAXIMA_NOMBRE_CLIENTE, unique: true })
  nombre: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}