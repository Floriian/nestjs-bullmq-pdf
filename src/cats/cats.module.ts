import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { CATS } from './cats.constants';
import { CatsController } from './cats.controller';
import { CatsRepository } from './cats.repository';
import { CatsService } from './cats.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: CATS.QUEUE,
    }),
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
})
export class CatsModule {}
