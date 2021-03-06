import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText'
})
export class TruncateTextPipe implements PipeTransform {

  transform(value: string): string {
    return value.length > 100 ? value.substring(0, 100) + "..." : value;
  }

}
