import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'GetRandom'
})
export class GetRandomPipe implements PipeTransform {
  transform(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}