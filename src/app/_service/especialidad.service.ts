import { Injectable } from '@angular/core';
import { Especialidad } from '../_model/especialidad';
import { HOST } from '../_shared/var.constants';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  url:string = `${HOST}/especialidades`;

  especialidadCambio = new Subject<Especialidad[]>();
  mensajeCambio = new Subject<string>();

  //inyeccion de dep
  constructor(private http: HttpClient){
  }

  listar(){
      return this.http.get<Especialidad[]>(this.url);
  }

  modificar(pac :Especialidad){ 
      return this.http.put(this.url,pac);
  }

  registrar(pac :Especialidad){
      return this.http.post(this.url,pac);
  }

  eliminar(id :number){
      return this.http.delete(`${this.url}/${id}`);
  }

  listarId(id:number){
      return this.http.get<Especialidad>(`${this.url}/${id}`);
  }
}
