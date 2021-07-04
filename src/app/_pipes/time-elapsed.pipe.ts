import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'TimeElapsed'
})
export class TimeElapsedPipe implements PipeTransform {

  transform(value: unknown): string {
    let inputDate 
    if(value !== undefined){
       inputDate = new Date(value.toString());
    }else{
      inputDate = new Date();
    }
    
    if(inputDate instanceof Date){
      let currentDate = new Date;
      let deltaTime = (currentDate.getTime() - inputDate.getTime())/1000;
      if(deltaTime < 60){
        return "A few seconds ago" 
      }
      else if(deltaTime < 120){
        return "1 minute ago" 
      }
      else if(deltaTime < 3600){
        return Math.floor(deltaTime/60) + " minutes ago" 
      }
      else if(deltaTime < 7200){
        return "1 hour ago" 
      }
      else if(deltaTime < 36000){
        return Math.floor(deltaTime/3660) + " hours ago" 
      }
      else if(deltaTime < 86400){
        return "A few hours ago" 
      }
      else if(deltaTime < 172800){
        return "1 day ago" 
      }
      else{
        return "A few days ago" 
      }
    }
    else{
      return null
    }
  }

}
