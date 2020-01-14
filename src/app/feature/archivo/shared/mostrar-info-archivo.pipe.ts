import { Pipe, PipeTransform } from '@angular/core';
import { Archivo } from './Archivo';

@Pipe({
  name: 'mostrarInfoArchivo'
})
export class MostrarInfoArchivoPipe implements PipeTransform {

  transform(value: Archivo): any {
      return `id: ${value.idArchivo} --- nombre: ${value.filename} --- tipo: ${value.filetype}`;
  }

}
