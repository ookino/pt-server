import { Module } from '@nestjs/common';
import { PropertiesResolver } from './properties.resolver';

@Module({
  imports: [],
  providers: [PropertiesResolver],
})
export class PropertiesModule {}
