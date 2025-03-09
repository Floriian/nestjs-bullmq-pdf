import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        url: 'localhost',
        port: 6379,
      },
    }),
    CatsModule,
  ],
})
export class AppModule {}
