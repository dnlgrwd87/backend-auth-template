import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

import { initializeFirebase } from './config/firebase';
import { Logger } from '@nestjs/common';

dotenv.config();

const bootstrap = async () => {
  initializeFirebase();

  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const port = process.env.PORT || 4000;
  await app.listen(port, () => Logger.log(`Listening on port ${port}`));
};

bootstrap();
