import { Module } from '@nestjs/common';

import { appImports } from './app.config';

@Module({
  imports: appImports,
  controllers: [],
  providers: [],
})
export class AppModule {}
