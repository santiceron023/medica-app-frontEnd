import { Injectable } from '@angular/core';
import { HOST } from '../../../shared/var.constants';
import { Subject } from 'rxjs';
import { Medico } from '../shared/medico';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  url = `${HOST}/medicos`;

  medicoCambio = new Subject<Medico[]>();
  mensajeCambio = new Subject<string>();

  // inyeccion de dep
  constructor(private http: HttpClient) {
  }

  listar() {
      return this.http.get<Medico[]>(this.url);
  }

  modificar(pac: Medico) {
      return this.http.put(this.url, pac);
  }

  registrar(pac: Medico) {
      return this.http.post(this.url, pac);
  }

  eliminar(id: number) {
      return this.http.delete(`${this.url}/${id}`);
  }

  listarId(id: number) {
      return this.http.get<Medico>(`${this.url}/${id}`);
  }
}
