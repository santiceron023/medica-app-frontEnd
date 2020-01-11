import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common'

@Pipe({
  name: 'dynamic'
})
export class DynamicPipe implements PipeTransform {

  transform(value: string): any {
    if(value==undefined || value == null){
      return;
    }
    if(value.indexOf("T") != -1){
    return new DatePipe('es-Es').transform(value,'yyyy-dd-mm');
    }


  }

}
