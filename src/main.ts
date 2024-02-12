import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { HandleResponseInterceptor } from './interceptors/handle-response/handle-response.interceptor'
import { AllExceptionFilter } from './all-exception/all-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const { httpAdapter } = app.get(HttpAdapterHost)
  app
    .setGlobalPrefix('api')
    .useGlobalInterceptors(new HandleResponseInterceptor())
    .useGlobalFilters(new AllExceptionFilter(httpAdapter))

  const config = new DocumentBuilder()
    .setTitle('Star wars API')
    .setDescription('The example API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/swagger', app, document)

  await app.listen(3000)
}

bootstrap()
