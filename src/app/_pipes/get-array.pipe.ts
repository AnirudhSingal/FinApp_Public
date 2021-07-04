import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'GetArray'
})
export class GetArrayPipe implements PipeTransform {
  transform(value: number): Array<number> {
    return Array(value); 
  }
}
