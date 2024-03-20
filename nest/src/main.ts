// #region @imports
// # NODE IMPORTS
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
// # PROJECT IMPORTS
import { AppModule } from './app/app.module';
import { SwaggerPlugin } from './plugins/swagger.plugin';
import { SendGridPlugin } from './plugins/sendgrid.plugin';
// #endregion

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const prefix = process.env.GLOBAL_PREFIX || 'api';
  const port = process.env.PORT || 3000;

  app.setGlobalPrefix(prefix);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  SwaggerPlugin.init(app, prefix);
  SendGridPlugin.init();

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${prefix}`,
    'NestApplication',
  );
}

bootstrap();
