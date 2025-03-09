import { IsNumber } from 'class-validator';

export class ExportCatDto {
  @IsNumber({}, { each: true })
  catIds: number[];
}
