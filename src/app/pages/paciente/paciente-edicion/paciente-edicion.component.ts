import { Paciente } from './../../../_model/paciente';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PacienteService } from 'src/app/_service/paciente.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-paciente-edicion',
  templateUrl: './paciente-edicion.component.html',
  styleUrls: ['./paciente-edicion.component.css']
})
export class PacienteEdicionComponent implements OnInit {

  paciente: Paciente;
  form: FormGroup;
  id: number;


  constructor(private formBuilder: FormBuilder
    , private pacService: PacienteService
    , private router: Router
    , private actualRoute: ActivatedRoute) { }

  ngOnInit() {
    this.paciente = new Paciente();
    this.formCreate();
    this.actualRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (this.id) {
        this.pacService.listarId(this.id).subscribe(
          (data) => {
            this.paciente = data;
            this.formCreate();
          }
        );
      }
    });

  }

  formCreate() {
    let id = this.id;

    // this.form = new FormGroup({
    //   'idFormCtrl': new FormControl(data.idPaciente)
    // });
    this.form = this.formBuilder.group({
      idFormCtrl: [id ? this.paciente.idPaciente : ''],
      nombresFormCtrl: [id ? this.paciente.nombres : '', Validators.required],
      apellidosFormCtrl: [id ? this.paciente.apellidos : '', Validators.required],
      dniFormCtrl: [id ? this.paciente.dni : '', Validators.required],
      direccionFormCtrl: [id ? this.paciente.direccion : '', Validators.required],
      telefonoFormCtrl: [id ? this.paciente.telefono : '', Validators.required],
      emailFormCtrl: [id ? this.paciente.email : '', Validators.required]
    });
  }

  operar() {
    this.paciente.apellidos = this.form.value['apellidosFormCtrl'];
    this.paciente.direccion = this.form.value['direccionFormCtrl'];
    this.paciente.dni = this.form.value['dniFormCtrl'];
    this.paciente.email = this.form.value['emailFormCtrl'];
    this.paciente.idPaciente = this.form.value['idFormCtrl'];
    this.paciente.nombres = this.form.value['nombresFormCtrl'];
    this.paciente.telefono = this.form.value['telefonoFormCtrl'];

    console.log(this.paciente);
    if (this.id) {
      this.pacService.registrar(this.paciente).subscribe(
        (data) => {
          console.log(data);
          this.pacService.listar().subscribe(data => {
            this.pacService.pacienteCambio.next(data);
            this.pacService.mensajeCambio.next('SE CREÓ');
          });
        });
    } else {
      this.pacService.modificar(this.paciente).subscribe(
        (data) => {
          console.log(data);
          this.pacService.listar().subscribe(data => {
            this.pacService.pacienteCambio.next(data);
            this.pacService.mensajeCambio.next('SE MODIFICÓ');
          });
        });
    }

    this.router.navigateByUrl('/paciente');

  }

}
