export class Cat {
  id: number;
  private name: string;
  private age: number;

  setName(name: string): Cat {
    this.name = name;
    return this;
  }

  setAge(age: number): Cat {
    this.age = age;

    return this;
  }

  getName(): string {
    return this.name;
  }

  getAge(): number {
    return this.age;
  }
}
