import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { config as dotenvConfig } from "dotenv"

dotenvConfig({ path: ".env" })

async function bootstrap() {
  const app = await NestFactory.create(AppModule)  
  app.setGlobalPrefix("api")
  app.enableCors()
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,      
      forbidNonWhitelisted: true,
      transform: true
    })
  )
  await app.listen(parseInt(process.env.SERVER_PORT, 10) || 3000)
}

bootstrap()

// yarn migration:generate -- database\migrations\create-table-pedidos
// todo: helmet
