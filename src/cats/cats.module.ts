import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { CatsEventsListener } from './cats-events.listener';
import { CATS } from './cats.constants';
import { CatsConsumer } from './cats.consumer';
import { CatsController } from './cats.controller';
import { CatsRepository } from './cats.repository';
import { CatsService } from './cats.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: CATS.QUEUE_NAME,
    }),
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository, CatsConsumer, CatsEventsListener],
})
export class CatsModule {}
