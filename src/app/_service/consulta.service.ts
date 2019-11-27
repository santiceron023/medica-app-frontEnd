import { Injectable } from '@angular/core';
import { HOST } from '../_shared/var.constants';
import { HttpClient } from '@angular/common/http';
import { ConsultaListaExamen } from '../_model/consultaListaExamen';
import { Consulta } from '../_model/consulta';
import { ConsultaResumen } from '../_model/ConsultaResumen';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  url: string = `${HOST}/consultas`;

  constructor(private http: HttpClient) { }

  registrar(consultaDTO: ConsultaListaExamen){
    return this.http.post(this.url, consultaDTO);
  }

  buscar(filtroConsulta : any){
    //dberia ser un get, peor es post porque tiene mcuhos arg
    return this.http.post<Consulta[]>(`${this.url}/buscar`, filtroConsulta);
  }

  listarResumen() {
    return this.http.get<ConsultaResumen[]>(`${this.url}/listarResumen`);
  }

  // generarReporte(){
  //   return this.http.get(`${this.url}/generarReporte`, {
  //     responseType: 'blob'
  //   });
  // }

  // guardarArchivo(data : File){
  //   let formdata: FormData = new FormData();
  //   formdata.append('file', data);

  //   return this.http.post(`${this.url}/guardarArchivo`, formdata, {
  //     responseType: 'text'
  //   });
  // }

  // leerArchivo(){
  //   return this.http.get(`${this.url}/leerArchivo/1`, {
  //     responseType: 'blob'
  //   });
  // }
}

