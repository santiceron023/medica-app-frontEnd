import { MedicoService } from '../../service/medico.service';
import { Medico } from '../../shared/medico';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.css']
})
export class MedicoDialogoComponent {
  public medico: Medico;

  constructor(
      private dialogRef: MatDialogRef<MedicoDialogoComponent>
    , @Inject(MAT_DIALOG_DATA) private data: Medico
    , private medService: MedicoService) {

    // para que no apunten a la misma ref
    this.medico = new Medico();
    Object.assign(this.medico, data);
  }

  cancelar() {
    this.dialogRef.close();
  }

  operar() {
    if (this.medico.idMedico) {
      this.medService.modificar(this.medico).subscribe(
        (data) => {
          this.medService.listar().subscribe(
            (med: Medico[]) => {
              this.medService.medicoCambio.next(med);
              this.medService.mensajeCambio.next('MODIFICADO');
            }
          );
        }
      );
    } else {
      this.medService.registrar(this.medico).subscribe(
        (data) => {
          this.medService.listar().subscribe(
            (med: Medico[]) => {
              this.medService.medicoCambio.next(med);
              this.medService.mensajeCambio.next('REGISTRADO');
            }
          );
        }
      );
    }
  }



}




// export interface DialogData {
//   urlImage: string;
//   nombre: string;
//   tipo:string;
// }