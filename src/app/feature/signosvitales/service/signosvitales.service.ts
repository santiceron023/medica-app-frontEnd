import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HOST } from 'src/app/shared/var.constants';
import { SignosVitales } from '../shared/signosvitales';
import { FiltroConsultar } from '../../buscar/shared/filtroConsulta';
import { BehaviorSubject } from 'rxjs';
import { Pageable } from 'src/app/shared/material/pageable';
import { PaginationRequestDto } from 'src/app/shared/model/PaginationRequestDto';

@Injectable({
  providedIn: 'root'
})
export class SignosvitalesService {

  private url = `${HOST}/signos`;
  cambioRealizado = new BehaviorSubject<boolean>(false);
  signoEditar: SignosVitales;


  constructor(private http: HttpClient) { }

  listarTodos(page: PaginationRequestDto) {
    return this.http.post<Pageable<SignosVitales>>(this.url, page);
  }

  listarPageableFiltro(filtro: FiltroConsultar) {
    return this.http.post<Pageable<SignosVitales>>(`${this.url}/filtro`, filtro);
  }

  guardar(signo: SignosVitales) {
    return this.http.post(this.url, signo);
  }

  actualizar(signo: SignosVitales) {
    return this.http.put(this.url, signo);
  }

  eliminar(idSgino: number) {
    return this.http.delete(`${this.url}/${idSgino}`);
  }

}
