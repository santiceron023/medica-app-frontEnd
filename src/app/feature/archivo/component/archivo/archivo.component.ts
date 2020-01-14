import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ArchivoService } from 'src/app/feature/archivo/service/archivo.service';
import { Archivo } from '../../shared/Archivo';

@Component({
  selector: 'app-archivo',
  templateUrl: './archivo.component.html',
  styleUrls: ['./archivo.component.css']
})
export class ArchivoComponent implements OnInit {

  //javascript native
  slectedFiles: FileList;
  labelFile: string;
  idImg: number;

  archivos: Archivo[];

  currentFileUpload: File;

  imagenEstado = false;
  imagenData: any;

  constructor(
    private sanitizador: DomSanitizer,
    private servicioArchivo: ArchivoService
  ) { }

  ngOnInit() {
    this.labelFile = 'Seleccionar archivo';
    this.servicioArchivo.listar().subscribe(
      archivos =>
        this.archivos = archivos
    );
  }

  selectFile(event: any) {
    console.log(event.target.files);
    this.labelFile = event.target.files[0].name;
    this.slectedFiles = event.target.files;
  }

  uploadFiles() {
    this.currentFileUpload = this.slectedFiles.item(0);
    this.servicioArchivo.guardar(this.currentFileUpload).subscribe(data => {
      console.log(data);
      this.slectedFiles = undefined;
      this.labelFile = undefined;
    });
  }

  mostrarImg() {
    if (!this.idImg) {
      return;
    }

    this.servicioArchivo.leer(this.idImg).subscribe(
      data => {
        console.log(data);
        // this.imagenData=data;
        this.convertir(data);
      }
    );
  }

  convertir(data: any) {
    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onload = () => {
      //falta sanitizador !!! error de peligro!!!!!!!!
      const datos = reader.result;

      this.setearSanitizar(datos);

      this.imagenEstado = !this.imagenEstado;

    };
  }
  setearSanitizar(x: any) {
    this.imagenData = this.sanitizador.bypassSecurityTrustResourceUrl(x);
  }


  mostrarInfoPipe(archivo: Archivo): string {
    return `id: ${archivo.idArchivo}, nombre: ${archivo.filename}, tipo: ${archivo.filetype}`
  }
}
