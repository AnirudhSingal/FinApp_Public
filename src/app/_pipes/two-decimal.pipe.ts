import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'twoDecimal'
})
export class TwoDecimalPipe implements PipeTransform {
  transform(value: any): string {
    try {
      if(value == null){
        throw Error;
      }
      let n = parseFloat(value);
      let decimalPlace = 1-Math.floor(Math.log10(n)); 
      return (n.toFixed(decimalPlace > 2 ? decimalPlace: 2)).toString();
    } catch (error) {
      return null;      
    }
  }
}