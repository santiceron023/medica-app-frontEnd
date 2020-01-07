import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HOST } from 'src/app/shared/var.constants';

@Injectable()
export class ArchivoService {
  url: string = `${HOST}/archivo`;

  //inyeccion de dep
  constructor(private http: HttpClient) {}

  guardar(file: File) {
    let formdata = new FormData();
    formdata.append('file', file);
    //response así porque recibe un txt
    return this.http.post(this.url, formdata);
  }

  leer() {
    return this.http.get(`${this.url}`, { responseType: 'blob' });
  }
}
