import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'NullValueConverter'
})
export class NullValueConverterPipe implements PipeTransform {

  transform(value: any): string {
    return  (value == null)? "--" : value;
  }

}
