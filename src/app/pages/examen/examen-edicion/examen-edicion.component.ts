import { Component, OnInit } from '@angular/core';
import { ExamenService } from 'src/app/_service/examen.service';
import { Examen } from 'src/app/_model/examen';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-examen-edicion',
  templateUrl: './examen-edicion.component.html',
  styleUrls: ['./examen-edicion.component.css']
})
export class ExamenEdicionComponent implements OnInit {
  
  examen: Examen;
  form: FormGroup;
  id: number;


  constructor(private formBuilder: FormBuilder
    , private exService: ExamenService
    , private router: Router
    , private actualRoute: ActivatedRoute) { }

  ngOnInit() {
    this.examen = new Examen();
    this.formCreate();
    this.actualRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (this.id) {
        this.exService.listarId(this.id).subscribe(
          (data) => {
            this.examen = data;
            this.formCreate();
          }
        );
      }
    });

  }

  formCreate() {
    let id = this.id;
    this.form = this.formBuilder.group({
      idFormCtrl: [id ? this.examen.idExamen : ''],
      nombresFormCtrl: [id ? this.examen.nombre : '', Validators.required],
      descripcionFormCtrl: [id ? this.examen.descripcion : '', Validators.required]
    });
  }

  operar() {
    this.examen.nombre = this.form.value['nombresFormCtrl'];
    this.examen.descripcion = this.form.value['descripcionFormCtrl'];

    console.log(this.examen, this.id);
    if (this.id) {
      this.exService.registrar(this.examen).subscribe(
        (data) => {
          console.log(data);
          this.exService.listar().subscribe(data => {
            this.exService.examenCambio.next(data);
            this.exService.mensajeCambio.next('SE CREÓ');
          });
        });
    } else {
      this.examen.idExamen=this.id;
      this.exService.modificar(this.examen).subscribe(
        (data) => {
          console.log(data);
          this.exService.listar().subscribe(data => {
            this.exService.examenCambio.next(data);
            this.exService.mensajeCambio.next('SE MODIFICÓ');
          });
        });
    }

    this.router.navigateByUrl("/examen");

  }
}
