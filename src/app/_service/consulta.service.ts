import { Injectable } from '@angular/core';
import { HOST } from '../_shared/var.constants';
import { HttpClient } from '@angular/common/http';
import { ConsultaListaExamen } from '../_model/consultaListaExamen';
import { Consulta } from '../_model/consulta';
import { ConsultaResumen } from '../_model/ConsultaResumen';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  url = `${HOST}/consultas`;

  constructor(private http: HttpClient) {}

  registrar(consultaDTO: ConsultaListaExamen) {
    return this.http.post(this.url, consultaDTO);
  }

  buscar(filtroConsulta: any) {
    // deria ser un get, peor es post porque tiene mcuhos arg
    return this.http.post<Consulta[]>(`${this.url}/buscar`, filtroConsulta);
  }

  // procedimeinto almacenado
  listarResumen(): Observable<ConsultaResumen[]> {
    return this.http.get<ConsultaResumen[]>(`${this.url}/listarResumen`);
  }

  generarReporte() {
    return this.http.get(`${this.url}/generarReporte`, {
      responseType: 'blob'
    });
  }

}
