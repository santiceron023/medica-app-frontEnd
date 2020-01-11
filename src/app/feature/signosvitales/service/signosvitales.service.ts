import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HOST } from 'src/app/shared/var.constants';
import { SignosVitales } from '../shared/signosvitales';
import { FiltroConsultar } from '../../buscar/shared/filtroConsulta';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignosvitalesService {

  private url = `${HOST}/signos`;
  cambioRealizado = new BehaviorSubject<boolean>(false);
  signoEditar: SignosVitales;


  constructor(private http: HttpClient) { }

  listarTodos() {
    return this.http.get<SignosVitales[]>(this.url);
  }

  listarfiltro(filtro: FiltroConsultar) {
    return this.http.post<SignosVitales[]>(`${this.url}/filtro`, filtro);
  }

  guardar(signo: SignosVitales) {
    return this.http.post(this.url, signo);
  }

}
