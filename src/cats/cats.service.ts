import { Injectable } from '@nestjs/common';
import { Cat } from './cat';
import { CatsRepository } from './cats.repository';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  async findAll() {
    return this.catsRepository.findAll();
  }

  async create(dto: CreateCatDto) {
    const cat = new Cat().setName(dto.name).setAge(dto.age);

    return this.catsRepository.create(cat);
  }
}
