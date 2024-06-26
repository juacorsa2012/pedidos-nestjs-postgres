import { AuthModule } from 'src/auth/auth.module'
import { Module } from '@nestjs/common'
import { ClienteService } from './cliente.service'
import { ClienteController } from './cliente.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Cliente } from './entities/cliente.entity'

@Module({
  providers: [ClienteService],
  controllers: [ClienteController],
  imports: [TypeOrmModule.forFeature([Cliente]), AuthModule],
  exports: [ClienteService]
})
export class ClienteModule {}
