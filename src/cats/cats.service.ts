import { InjectQueue } from '@nestjs/bullmq';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Queue } from 'bullmq';
import { compile } from 'handlebars';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Browser } from 'puppeteer';
import { Cat } from './cat';
import { CATS } from './cats.constants';
import { CatsRepository } from './cats.repository';
import { CreateCatDto } from './dto/create-cat.dto';
import { ExportCatDto } from './dto/export-cat.dto';

@Injectable()
export class CatsService {
  private readonly logger = new Logger(CatsService.name);
  constructor(
    private readonly catsRepository: CatsRepository,
    @InjectQueue(CATS.QUEUE_NAME) private readonly catsQueue: Queue,
  ) {}

  async findAll() {
    return this.catsRepository.findAll();
  }

  async export(exportCatDto: ExportCatDto) {
    const cats = await this.catsRepository.findAll();

    const exportCats = cats.filter((cat) =>
      exportCatDto.catIds.includes(cat.id),
    );

    if (!exportCats.length) {
      throw new BadRequestException('No cats found with the provided ids');
    }

    return this.catsQueue.add(CATS.JOB_NAME, exportCats);
  }

  async create(dto: CreateCatDto) {
    const cat = new Cat().setName(dto.name).setAge(dto.age);

    return this.catsRepository.create(cat);
  }

  async createPdf(data: Cat | Cat[], browser: Browser): Promise<boolean> {
    try {
      const templateFile = await readFileSync(
        join(__dirname, '../', 'pdf-templates', 'cats.template.hbs'),
        'utf8',
      );

      const template = compile(templateFile);
      const html = template({ cats: Array.isArray(data) ? data : [data] });

      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0' });

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const outputPath = join(__dirname, '../', 'public', `${timestamp}.pdf`);

      await page.pdf({
        path: outputPath,
        format: 'A4',
      });
      await page.close();
      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  @OnEvent(CATS.CATS_EXPORTED)
  handleCatsExportedEvent() {
    // handle notification
    console.log('Cats exported');
  }
}
