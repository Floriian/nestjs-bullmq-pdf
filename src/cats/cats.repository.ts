import { Injectable } from '@nestjs/common';
import { Cat } from './cat';

@Injectable()
export class CatsRepository {
  private cats: Cat[] = [];

  async create(cat: Cat): Promise<Cat> {
    cat.id = this.cats.length + 1;
    this.cats.push(cat);
    return cat;
  }

  async findAll(): Promise<Cat[]> {
    return this.cats;
  }

  async findOne(id: number): Promise<Cat> {
    return this.cats.find((cat) => cat.id === id);
  }

  async update(id: number, cat: Cat): Promise<Cat> {
    const index = this.cats.findIndex((cat) => cat.id === id);
    this.cats[index] = cat;
    return cat;
  }

  async delete(id: number): Promise<void> {
    this.cats = this.cats.filter((cat) => cat.id !== id);
  }
}
