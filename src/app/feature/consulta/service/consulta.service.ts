import { Injectable } from '@angular/core';
import { HOST } from '../../../shared/var.constants';
import { HttpClient } from '@angular/common/http';
import { ConsultaListaExamen } from '../shared/consultaListaExamen';
import { Consulta } from '../shared/consulta';
import { ConsultaResumen } from '../../reporte/shared/ConsultaResumen';
import { Observable } from 'rxjs';
import { FiltroConsultar  } from '../../buscar/shared/filtroConsulta';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  url = `${HOST}/consultas`;

  constructor(private http: HttpClient) {}

  registrar(consultaDTO: ConsultaListaExamen) {
    return this.http.post(this.url, consultaDTO);
  }

  buscar(filtroConsulta: FiltroConsultar ) {
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
