import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
import { AppModule } from './app.module';
import { LoaderEnv } from './config/loader';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { Logger, PinoLogger } from 'nestjs-pino';

const logger = new PinoLogger({});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false });
  app.useLogger(app.get(Logger));

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  // Only Build docs if not in production
  if (!LoaderEnv.isProduction()) {
    const options = new DocumentBuilder()
      .setTitle(LoaderEnv.envs.SWAGGER_API_TITLE)
      .setDescription(LoaderEnv.envs.SWAGGER_API_DESC)
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);
    logger.info(`Swagger docs builded to /docs/`);
  }

  await app.listen(LoaderEnv.envs.APP_PORT);
  logger.info(`Listen APP on PORT :: ${LoaderEnv.envs.APP_PORT}`);

}
bootstrap();
