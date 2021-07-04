import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalIdCounterService {


  private count = 1;

  constructor() { }

  getUniqueId(){
    return (this.count++).toString();
  }

}
