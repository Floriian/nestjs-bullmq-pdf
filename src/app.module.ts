import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        url: 'localhost',
        port: 6379,
      },
    }),
  ],
})
export class AppModule {}
