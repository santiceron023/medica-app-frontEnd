import { Examen } from 'src/app/_model/examen';
import { Injectable } from '@angular/core';
import { HOST } from '../_shared/var.constants';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  url = `${HOST}/examenes`;

  examenCambio = new Subject<Examen[]>();
  mensajeCambio = new Subject<string>();


  constructor(private http: HttpClient) {
  }

  listar() {
      return this.http.get<Examen[]>(this.url);
  }

  modificar(pac: Examen) {
      return this.http.put(this.url, pac);
  }

  registrar(pac: Examen) {
      return this.http.post(this.url, pac);
  }

  eliminar(id: number) {
      return this.http.delete(`${this.url}/${id}`);
  }

  listarId(id: number) {
      return this.http.get<Examen>(`${this.url}/${id}`);
  }
}
