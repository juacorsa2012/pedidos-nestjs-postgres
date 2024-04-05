import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("usuarios")
export class Usuario {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column("varchar", { length: 255, unique: true })
  email: string

  @Column("varchar", { length: 255, unique: true, select: false })
  password: string

  @Column("bool", { default: true })
  activo: boolean

  @Column("text", { array: true })
  roles: string[]

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim()
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert()
  }
}