import { HOST } from './../_shared/var.constants';
import { Paciente } from './../_model/paciente';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


@Injectable( { providedIn: 'root' } )
export class PacienteService {

    host:string = HOST;

    pacienteCambio = new Subject<Paciente[]>();
    mensajeCambio = new Subject<string>();

    //inyeccion de dep
    constructor(private http: HttpClient){
    }

    listar(){
        return this.http.get<Paciente[]>(`${this.host}/pacientes`);
    }

    modificar(pac :Paciente){ 
        return this.http.put(`${this.host}/pacientes`,pac);
    }

    registrar(pac :Paciente){
        return this.http.post(`${this.host}/pacientes`,pac);
    }

    eliminar(id :number){
        return this.http.delete(`${this.host}/pacientes/${id}`);
    }

    listarId(id:number){
        return this.http.get<Paciente>(`${this.host}/pacientes/${id}`);
    }
}