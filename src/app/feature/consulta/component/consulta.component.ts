import { MatSnackBar } from '@angular/material';
import { ConsultaService } from '../service/consulta.service';
import { ConsultaListaExamen } from '../shared/consultaListaExamen';
import { ExamenService } from '../../examen/service/examen.service';
import { DetalleConsulta } from '../../buscar/shared/detalleConsulta';
import { MedicoService } from '../../medico/service/medico.service';
import { Especialidad } from 'src/app/feature/especialidad/shared/especialidad';
import { Medico } from 'src/app/feature/medico/shared/medico';
import { PacienteService } from '../../paciente/service/paciente.service';
import { Paciente } from '../../paciente/shared/paciente';
import { Component, OnInit } from '@angular/core';
import { Examen } from 'src/app/feature/examen/shared/examen';
import { EspecialidadService } from 'src/app/feature/especialidad/service/especialidad.service';
import { Consulta } from 'src/app/feature/consulta/shared/consulta';
import * as moment from 'moment';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  pacientes: Paciente[];
  medicos: Medico[];
  especialidades: Especialidad[];
  examenes: Examen[];
  fechaSeleccionada: Date;
  hoy = new Date();

  idPacienteSeleccionado: number;
  idMedicoSeleccionado: number;
  idEspecialidadSeleccionado: number;
  idExamenSeleccionado: number;

  detalleConsulta: DetalleConsulta[] = [];
  examenesConsulta: Examen[] = [];

  diagnostico: string = null;
  tratamiento: string = null;

  constructor(
      private pacService: PacienteService
    , private medService: MedicoService
    , private snackBar: MatSnackBar
    , private exaService: ExamenService
    , private conExamen: ConsultaService
    , private espService: EspecialidadService
    ) { }

  ngOnInit() {

    this.pacService.listar().subscribe(
      (data: Paciente[]) => {
        this.pacientes = data;
      }
    );

    this.medService.listar().subscribe(
      (data: Medico[]) => {
        this.medicos = data;
      }
    );

    this.espService.listar().subscribe(
      (data: Especialidad[]) => {
        this.especialidades = data;
      }
    );

    this.exaService.listar().subscribe(
      (data: Examen[]) => {
        this.examenes = data;
      }
    );


  }

  agregarDetalle() {
    if (this.tratamiento && this.diagnostico) {
      const newDet = new DetalleConsulta();
      newDet.diagnostico = this.diagnostico;
      newDet.tratamiento = this.tratamiento;
      this.detalleConsulta.push(newDet);

      this.diagnostico = null;
      this.tratamiento = null;
    } else {
      this.snackBar.open('Seleccione detalle', 'Aviso', { duration: 2000 });
    }
  }

  removerDet(i: number) {
    // remueve por index
    this.detalleConsulta.splice(i, 1);
  }

  agregarExamen() {
    if (this.idExamenSeleccionado > 0) {
      const exists = this.examenesConsulta.find(
        examen => examen.idExamen === this.idExamenSeleccionado
      );
      if (!exists) {
        const newDet = this.examenes.find(
          item => item.idExamen === this.idExamenSeleccionado
        );
        this.examenesConsulta.push(newDet);
        this.idExamenSeleccionado = null;
      }
    } else {
      this.snackBar.open('Seleccione exámen', 'Aviso', { duration: 2000 });
    }
  }

  estadoBotonRegistrar() {
    return (this.detalleConsulta.length === 0
      || this.idEspecialidadSeleccionado === 0
      || this.idMedicoSeleccionado === 0
      || this.idPacienteSeleccionado === 0);
  }

  removerExa(i: number) {
    // remueve por index
    this.examenesConsulta.splice(i, 1);
  }

  guardar() {
    const medico = new Medico();
    const especialidad = new Especialidad();
    const paciente = new Paciente();
    medico.idMedico = this.idMedicoSeleccionado;
    especialidad.idEspecialidad = this.idEspecialidadSeleccionado;
    paciente.idPaciente = this.idPacienteSeleccionado;

    const consulta = new Consulta();
    consulta.especialidad = especialidad;
    consulta.paciente = paciente;
    consulta.medico = medico;

    // ver captura de horas
    consulta.fecha = moment(this.fechaSeleccionada).toISOString();
    consulta.detalleConsulta = this.detalleConsulta;

    const consultaListaExamen = new ConsultaListaExamen();
    consultaListaExamen.consulta = consulta;
    consultaListaExamen.examenList = this.examenesConsulta;

    this.conExamen.registrar(consultaListaExamen).subscribe(() => {
      this.snackBar.open('Se registró', 'Aviso', { duration: 2000 });

      setTimeout(() => {
        this.limpiarControles();
      }, 2000);


    });
  }


  limpiarControles() {
    this.detalleConsulta = [];
    this.examenesConsulta = [];
    this.diagnostico = '';
    this.tratamiento = '';
    this.idPacienteSeleccionado = 0;
    this.idEspecialidadSeleccionado = 0;
    this.idMedicoSeleccionado = 0;
    this.idExamenSeleccionado = 0;
    this.fechaSeleccionada = null;
  }

}
