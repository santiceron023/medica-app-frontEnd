import { Paciente } from './../../../_model/paciente';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/_model/medico';
import { Especialidad } from 'src/app/_model/especialidad';
import { Examen } from 'src/app/_model/examen';
import { DetalleConsulta } from 'src/app/_model/detalleConsulta';
import { PacienteService } from 'src/app/_service/paciente.service';
import { MedicoService } from 'src/app/_service/medico.service';
import { MatSnackBar } from '@angular/material';
import { ExamenService } from 'src/app/_service/examen.service';
import { ConsultaService } from 'src/app/_service/consulta.service';
import { map } from 'rxjs/operators';
import { EspecialidadService } from 'src/app/_service/especialidad.service';
import { Observable } from 'rxjs';
import  * as moment  from  'moment';
import { Consulta } from 'src/app/_model/consulta';
import { ConsultaListaExamen } from 'src/app/_model/consultaListaExamen';

enum FilterOption {
  Medico = 1,
  Paciente = 2,
  Especialidad = 3,
  Examen = 4
}

@Component({
  selector: 'app-especial',
  templateUrl: './especial.component.html',
  styleUrls: ['./especial.component.css']
})
export class EspecialComponent implements OnInit {


  pacientes = new Array<Paciente>();
  medicos: Medico[];
  especialidades: Especialidad[];
  examenes: Examen[];
  fechaSeleccionada: Date;
  hoy = new Date();

  filteredPaciente: Observable<Paciente[]>;
  filteredMedico: Observable<Medico[]>;
  filteredEspecialidad: Observable<Especialidad[]>;
  filteredExamen: Observable<Examen[]>;

  formGroup: FormGroup;

  detalleConsulta: DetalleConsulta[] = [];
  examenesConsulta: Examen[] = [];


  constructor(private pacService: PacienteService
    , private medService: MedicoService
    , private snackBar: MatSnackBar
    , private formBuilder: FormBuilder
    , private exaService: ExamenService
    , private conExamen: ConsultaService
    , private espService: EspecialidadService) {

  }

  ngOnInit() {
    this.chargeData();
    this.formSetup();
  }

  chargeData() {

    this.pacService.listar().subscribe(
      (data: Paciente[]) => {
        this.pacientes = data;
        // inicio para que salga TODA opc, con la data existente
        // startWith(''),
        this.formGroup.controls.pacienteFormCtrl.setValue('');
      }
    );

    this.medService.listar().subscribe(
      (data: Medico[]) => {
        this.medicos = data;
        this.formGroup.controls.medicoFormCtrl.setValue('');
      }
    );

    this.espService.listar().subscribe(
      (data: Especialidad[]) => {
        this.especialidades = data;
        this.formGroup.controls.especialidadFormCtrl.setValue('');
      }
    );

    this.exaService.listar().subscribe(
      (data: Examen[]) => {
        this.examenes = data;
        this.formGroup.controls.examenFormCtrl.setValue('');
      }
    );

  }


  formSetup() {

    this.formGroup = this.formBuilder.group({
      pacienteFormCtrl: ['', this.cleanValidator],
      medicoFormCtrl: ['', this.cleanValidator],
      especialidadFormCtrl: ['', this.cleanValidator],
      examenFormCtrl: ['', this.cleanValidator],
      fechaFormCtrl: [Validators.required],
      diagnosticoFormCtrl: [],
      tratamientoFormCtrl: []
    });

    this.filteredPaciente = this.formGroup.controls.pacienteFormCtrl.valueChanges
      .pipe(
        //inicio para que salga TODA opc --> startWith(''),
        map(value => this._filter(value, FilterOption.Paciente))
      );

    this.filteredMedico = this.formGroup.controls.medicoFormCtrl.valueChanges
      .pipe(
        map(value => this._filter(value, FilterOption.Medico))
      );

    this.filteredEspecialidad = this.formGroup.controls.especialidadFormCtrl.valueChanges
      .pipe(
        map(value => this._filter(value, FilterOption.Especialidad))
      );

      this.filteredExamen = this.formGroup.controls.examenFormCtrl.valueChanges
      .pipe(
        map(value => this._filter(value, FilterOption.Examen))
      );
  }

  guardar() {
    let medico = this.formGroup.value['medicoFormCtrl'];
    let especialidad = this.formGroup.value['especialidadFormCtrl'];
    let paciente = this.formGroup.value['pacienteFormCtrl'];
    //ver captura de horas
    let fecha = moment(this.formGroup.value['fechaFormCtrl']).toISOString();
    let consulta = new Consulta();

    consulta.medico = medico;
    consulta.paciente = paciente;
    consulta.especialidad = especialidad;
    consulta.fecha = fecha;
    consulta.detalleConsulta = this.detalleConsulta;

    let consultaListaExamen = new ConsultaListaExamen();
    consultaListaExamen.consulta = consulta;
    consultaListaExamen.examenList = this.examenesConsulta;

    this.conExamen.registrar(consultaListaExamen).subscribe(() => {
      this.snackBar.open('Se registró', 'Aviso', { duration: 2000 });

      setTimeout(() => {
        this.limpiarControles();
      }, 2000);


    });
  }

  limpiarControles(){
    this.formGroup.reset();
    this.examenesConsulta = [];
    this.detalleConsulta = [];
  }

  agregarDetalle() {
    if (this.formGroup.value['diagnosticoFormCtrl'] && this.formGroup.value['tratamientoFormCtrl']) {
      let newDet = new DetalleConsulta();
      newDet.diagnostico = this.formGroup.value['diagnosticoFormCtrl'];
      newDet.tratamiento = this.formGroup.value['tratamientoFormCtrl'];
      this.detalleConsulta.push(newDet);

      this.formGroup.controls.diagnosticoFormCtrl.setValue(null);
      this.formGroup.controls.tratamientoFormCtrl.setValue(null);
    } else {
      this.snackBar.open('Seleccione detalle', 'Aviso', { duration: 2000 })
    }
  }
  removerDet(i: number) {
    //remueve por index 
    this.detalleConsulta.splice(i, 1);
  }

  
  agregarExamen() {
    let newDet;
    let value = <Examen>this.formGroup.value['examenFormCtrl'];
        if (value.idExamen > 0 ) {

      let exists = this.examenesConsulta.find(
        examen => examen.idExamen === value.idExamen
      );
      if (!exists) {
        newDet = this.examenes.find(
          item => item.idExamen === value.idExamen
        );
        this.examenesConsulta.push(newDet);
       this.formGroup.controls.examenFormCtrl.setValue('');
      }
    } else {
      this.snackBar.open('Seleccione exámen', 'Aviso', { duration: 2000 })
    }
  }
  removerExa(i: number) {
    //remueve por index 
    this.examenesConsulta.splice(i, 1);
  }


  private _filter(value: any, option: number): Array<any> {

    //cuando es seleccionado ya no es un string sino el objeto no se hace nada
    if (typeof (value) == 'string') {
      const filterValue = value.toLowerCase();

      switch (option) {
        case FilterOption.Especialidad:
          return this.especialidades.filter(option =>
            option.nombre.toLowerCase().includes(filterValue)
          );

        case FilterOption.Paciente:
          return this.pacientes.filter(option =>
            option.nombres.toLowerCase().includes(filterValue)
            ||
            option.apellidos.toLowerCase().includes(filterValue)
          );

        case FilterOption.Examen:
          return this.examenes.filter(option =>
            option.descripcion.toLowerCase().includes(filterValue)
            ||
            option.nombre.toLowerCase().includes(filterValue)
          );

        case FilterOption.Medico:
          return this.medicos.filter(option =>
            option.nombres.toLowerCase().includes(filterValue)
            ||
            option.apellidos.toLowerCase().includes(filterValue)
          );
      }
    }
  }
  pipeSelected(val: any) {
    if (!val) return
    // [Paciente | Medico | Especialidad] 
    if (val['idEspecialidad'])
    //  ((val instanceof Especialidad))
    {
      return val ? `${(<Especialidad>val).nombre}` : val;
    } else if(val['idExamen']){
      return val ? `${(<Examen>val).nombre}` : val;
    } else{
      return val ? `${val.nombres} ${val.apellidos}` : val;
    }
  }

  cleanValidator(control: FormControl): { [s: string]: boolean } {
    if (typeof (control.value) == 'string') return { cleanValidator: true };
    //OK
    return null;
  }

}
