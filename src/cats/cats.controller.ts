import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { ExportCatDto } from './dto/export-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async findAll() {
    return this.catsService.findAll();
  }

  @Post('export')
  async export(@Body() exportCatDto: ExportCatDto) {
    return this.catsService.export(exportCatDto);
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }
}
