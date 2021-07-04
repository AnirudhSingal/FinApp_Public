import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addSymbol'
})
export class AddSymbolPipe implements PipeTransform {

  transform(value: any, symbol: string): unknown {
    try {
      if(value == null){
        throw Error
      }
      return value.toString() + symbol

    } catch (error) {
      return null;
    }


  }

}
