import { Processor, WorkerHost } from '@nestjs/bullmq';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Job } from 'bullmq';
import puppeteer from 'puppeteer';
import { Cat } from './cat';
import { CATS } from './cats.constants';
import { CatsService } from './cats.service';

@Processor(CATS.QUEUE_NAME)
export class CatsConsumer extends WorkerHost {
  constructor(
    private readonly catsService: CatsService,
    private readonly eventEmitter: EventEmitter2,
  ) {
    super();
  }
  async process(job: Job<Cat[], any>): Promise<any> {
    const browser = await puppeteer.launch();

    const exportResult = await this.catsService.createPdf(job.data, browser);

    if (exportResult) {
      await job.updateProgress(100);
    }

    await browser.close();

    return {};
  }
}
