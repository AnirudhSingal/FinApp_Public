import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'AbrreviateNumber'
})
export class AbrreviateNumberPipe implements PipeTransform {

  transform(value: any): any {


    let newValue = value;

    if(value == null){
      return null;
    }
    else if (value >= 1000) {
      let suffixes = ["", "K", "M", "B", "t", "q"];
      let suffixNum = Math.floor(value.toString().length / 3);
      if (suffixNum > 5) {
        suffixNum = 5;
      }

      let shortValue: any;
      shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(4));
      newValue = shortValue + suffixes[suffixNum];
      return newValue;
    }
    else{
      return value;
    } 
  }
}