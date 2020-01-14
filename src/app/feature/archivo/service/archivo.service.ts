import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HOST } from 'src/app/shared/var.constants';
import { Archivo } from '../shared/Archivo';

@Injectable()
export class ArchivoService {
  url = `${HOST}/archivo`;

  // inyeccion de dep
  constructor(private http: HttpClient) { }

  guardar(file: File) {
    const formdata = new FormData();
    formdata.append('file', file);
    // response así porque recibe un txt
    return this.http.post(this.url, formdata);
  }

  leer(id: number) {
    return this.http.get(`${this.url}/imagen/${id}`, { responseType: 'blob' });
  }

  listar() {
    return this.http.get<Archivo[]>(`${this.url}/lista`);
  }
}
