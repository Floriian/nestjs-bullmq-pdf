import {
  OnQueueEvent,
  QueueEventsHost,
  QueueEventsListener,
} from '@nestjs/bullmq';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Job } from 'bullmq';
import { CATS } from './cats.constants';

@QueueEventsListener(CATS.QUEUE_NAME)
export class CatsEventsListener extends QueueEventsHost {
  constructor(private readonly eventEmitter: EventEmitter2) {
    super();
  }

  @OnQueueEvent('completed')
  async onJobCompleted(job: Job) {
    this.eventEmitter.emit(CATS.CATS_EXPORTED, job);
  }
}
