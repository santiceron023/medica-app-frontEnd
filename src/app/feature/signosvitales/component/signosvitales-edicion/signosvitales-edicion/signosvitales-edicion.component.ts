import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignosvitalesService } from '../../../service/signosvitales.service';
import { MatSnackBar } from '@angular/material';
import { SignosVitales } from '../../../shared/signosvitales';
import * as moment from 'moment';
import { PacienteService } from 'src/app/feature/paciente/service/paciente.service';
import { Paciente } from 'src/app/feature/paciente/shared/paciente';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signosvitales-edicion',
  templateUrl: './signosvitales-edicion.component.html',
  styleUrls: ['./signosvitales-edicion.component.css']
})
export class SignosvitalesEdicionComponent implements OnInit {

  form: FormGroup;
  pacientes: Paciente[];
  filteredPaciente: Observable<Paciente[]>;
  maxFecha = new Date();

  constructor(
    private router: Router,
    private pacienteService: PacienteService,
    private signosService: SignosvitalesService,
    private snack: MatSnackBar) { }

  ngOnInit() {
    const signo = this.signosService.signoEditar;
    this.form = new FormGroup({
      pacienteFormCtrl: new FormControl(
        signo ? signo.paciente : '', Validators.required),
      fechaFormCtrl: new FormControl(
        signo ? new Date(signo.fecha) : '', Validators.required),
      temperaturaFormCtrl: new FormControl(
        signo ? signo.temperatura : '', Validators.required),
      pulsoFormCtrl: new FormControl(
        signo ? signo.pulso : '', Validators.required),
      ritmoFormCtrl: new FormControl(
        signo ? signo.ritmoRespiratorio : '', Validators.required)
    });

    this.filteredPaciente = this.form.controls.pacienteFormCtrl.valueChanges
      .pipe(
        // inicio para que salga TODA opc --> startWith(''),
        map(value => this._filter(value))
      );

    this.chargeData(signo);
  }

  chargeData(signo: SignosVitales) {
    this.pacienteService.listar().subscribe(
      (lista) => {
        console.log(lista);
        this.pacientes = lista;
        if (!signo) {
          // para que salgan todos los valores al inicio --> startWith('')
          this.form.controls.pacienteFormCtrl.setValue('');
        }
      }
    );

  }

  guardar() {
    const date = new Date();
    const id = this.signosService.signoEditar ? this.signosService.signoEditar.id : null;
    const signo = new SignosVitales(
      id,
      this.form.value.pacienteFormCtrl,
      moment(this.form.value.fechaFormCtrl).set({
        hour: date.getHours(),
        minutes: date.getMinutes()
      }).
        toISOString(),
      this.form.value.temperaturaFormCtrl,
      this.form.value.pulsoFormCtrl,
      this.form.value.ritmoFormCtrl
    );
    this.signosService.guardar(signo).subscribe(
      () => {
        this.signosService.cambioRealizado.next(true);
        const mensaje = (signo.id) ? 'Actualizado con éxito' : 'Creado con éxito';
        this.snack.open(mensaje, 'mensaje', { duration: 2000 });
        this.router.navigateByUrl('/signosvitales');
      }
    );
  }

  cancelar() {
    this.signosService.cambioRealizado.next(true);
    this.router.navigateByUrl('/signosvitales');
  }

  private _filter(value: any): Array<any> {

    // cuando es seleccionado, ya no es un string, sino el objeto -> no se hace nada
    if (typeof (value) === 'string') {
      const filterValue = value.toLowerCase();

      return this.pacientes.filter(item =>
        item.nombres.toLowerCase().includes(filterValue)
      );
    }
  }

  pipeSelected(val: Paciente) {
    return val ? `${val.nombres} ${val.apellidos}` : val;
  }

}
