import { Cliente } from "../../cliente/entities/cliente.entity"
import { Constant } from "../../config/constants"
import { Producto } from "../../producto/entities/producto.entity"
import { Proveedor } from "../../proveedor/entities/proveedor.entity"
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

  @Column("varchar", { length: Constant.LONGITUD_MAXIMA_MODELO_PEDIDO, nullable: true })
  modelo: string

  @Column("varchar", { length: Constant.LONGITUD_MAXIMA_REFERENCIA_PEDIDO, nullable: true })
  referencia: string

  @Column("varchar", { length: Constant.LONGITUD_MAXIMA_OFERTA_PEDIDO, nullable: true })
  oferta: string
  
  @Column("varchar", { length: Constant.LONGITUD_MAXIMA_CONTRATO_MENOR_PEDIDO, nullable: true })
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
