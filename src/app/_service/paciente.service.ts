import { Pageable } from './../_model/pageable';
import { HOST } from './../_shared/var.constants';
import { Paciente } from './../_model/paciente';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class PacienteService {

    host: string = HOST;

    pacienteCambio = new Subject<Paciente[]>();
    mensajeCambio = new Subject<string>();

    //inyeccion de dep
    constructor(private http: HttpClient) {
    }

    listar() {
        return this.http.get<Paciente[]>(`${this.host}/pacientes`);
    }


    listarPageable(page: number, size: number) {

        // Initialize Params Object
        let params = new HttpParams();

        // Begin assigning parameters
        params = params.append('page', page.toString());
        params = params.append('size', size.toString());
        return this.http.get<Pageable<Paciente>>(`${this.host}/pacientes/pageable`,{params: params});
    }


    modificar(pac: Paciente) {
        return this.http.put(`${this.host}/pacientes`, pac);
    }

    registrar(pac: Paciente) {
        return this.http.post(`${this.host}/pacientes`, pac);
    }

    eliminar(id: number) {
        return this.http.delete(`${this.host}/pacientes/${id}`);
    }

    listarId(id: number) {
        return this.http.get<Paciente>(`${this.host}/pacientes/${id}`);
    }


    burnData() {
        return `[
          {
            'idPaciente': 1,
            'direccion': 'calle 34',
            'dni': '23421',
            'nombres': 'jaime',
            'apellidos': 'garzon',
            'telefono': '232354',
            'email': 'garzon@gmail.com'
          },
          {
            'idPaciente': 3,
            'direccion': 'estadio atanasio',
            'dni': '1234567',
            'nombres': 'Santiago',
            'apellidos': 'Cerón',
            'telefono': '456543',
            'email': 'SFC@gmail.com'
          },
          {
            'idPaciente': 2,
            'direccion': 'edif. atanasio apto 568',
            'dni': '88909890',
            'nombres': 'katherine',
            'apellidos': 'Vela',
            'telefono': '311645342',
            'email': 'katheInt@gmail.com'
          },
          {
            'idPaciente': 5,
            'direccion': 'estadio atanasio',
            'dni': 'abc123',
            'nombres': 'Alicia',
            'apellidos': 'Rodriguez',
            'telefono': '456543',
            'email': 'CaroR@gmail.com'
          },
          {
            'idPaciente': 7,
            'direccion': 'calle 34#22-13',
            'dni': '1892434',
            'nombres': 'juddy',
            'apellidos': 'Reyna Fuentes',
            'telefono': '73124543',
            'email': 'judy@gmail.com'
          },
          {
            'idPaciente': 8,
            'direccion': 'paq robledo',
            'dni': '4545122',
            'nombres': 'Dayana',
            'apellidos': 'Dante Bello',
            'telefono': '909090990',
            'email': 'daya@hotmail.com'
          },
          {
            'idPaciente': 10,
            'direccion': 'envigado',
            'dni': '345423',
            'nombres': 'camilo',
            'apellidos': 'henao',
            'telefono': '456789',
            'email': 'chemano@gmail.com'
          },
          {
            'idPaciente': 11,
            'direccion': 'bello',
            'dni': '897843',
            'nombres': 'Daniela',
            'apellidos': 'orozco',
            'telefono': '4567000',
            'email': 'dorozco@gmail.com'
          }
        ]`;
      }
}