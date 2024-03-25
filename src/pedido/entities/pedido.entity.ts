import { IsIn } from "class-validator"
import { Cliente } from "src/cliente/entities/cliente.entity"
import { Producto } from "src/producto/entities/producto.entity"
import { Proveedor } from "src/proveedor/entities/proveedor.entity"
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

export enum EstadoPedido {
  PEDIDO = "P",
  PREPARADO = "PR",
  ENTREGADO = "E",
  FACTURADO = "F",
}

@Entity("pedidos")
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Cliente, (cliente) => cliente.pedidos)
  cliente: Cliente

  @ManyToOne(() => Producto, (producto) => producto.pedidos)
  producto: Producto

  @ManyToOne(() => Proveedor, (proveedor) => proveedor.pedidos)
  proveedor: Proveedor

  @Column("varchar", { length: 50, nullable: true })
  modelo: string

  @Column("varchar", { length: 10, nullable: true })
  referencia: string

  @Column("varchar", { length: 10, nullable: true })
  oferta: string
  
  @Column("varchar", { length: 50, nullable: true })
  contrato_menor: string  
  
  @Column("text", { nullable: true })
  observaciones: string

  @Column("int", { nullable: false, default: 1 })
  unidades: number

  @Column("int", { nullable: true })
  parte: number

  @Column({type: "enum", enum: EstadoPedido, default: EstadoPedido.PEDIDO})
  estado: EstadoPedido
 
  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
  
  @Column("int", { nullable: false })
  public clienteId: number

  @Column("int", { nullable: false })
  public productoId: number

  @Column("int", { nullable: false })
  public proveedorId: number

}
