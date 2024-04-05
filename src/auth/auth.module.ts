import { TypeOrmModule } from "@nestjs/typeorm"
import { JwtModule } from "@nestjs/jwt"
import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { PassportModule } from "@nestjs/passport"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { Usuario } from "./entities/usuario.entity"
import { JwtStrategy } from "./strategies/jwt.strategy"

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Usuario]),
    PassportModule.register({defaultStrategy: "jwt"}),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get("JWT_SECRET"),
          signOptions: { expiresIn: "24h"}
        }
      }
    })
  ],
  exports: [TypeOrmModule, JwtStrategy, PassportModule, JwtModule]
  
})
export class AuthModule {}
