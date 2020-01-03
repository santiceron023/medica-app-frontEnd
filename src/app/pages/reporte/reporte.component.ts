import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConsultaService } from 'src/app/_service/consulta.service';
import { ConsultaResumen } from 'src/app/_model/ConsultaResumen';
import { Chart } from 'chart.js';
import { ArchivoService } from 'src/app/_service/archivo.service';
import { DomSanitizer } from '@angular/platform-browser';

export enum graphType {
  line = 'line',
  bar = 'bar',
  doughnut = 'doughtnut',
  radar = 'radar',
  pie = 'pie'
}

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  @ViewChild('idGraph', { static: true }) graphRef: ElementRef;

  tipoGraf: string;
  chart: Chart;
  pdfSrc;
  //javascript native
  slectedFiles: FileList;
  labelFile:string;

  currentFileUpload: File;

  imagenEstado = false;
  imagenData: any;

  constructor(
    private servicioConsulta: ConsultaService,
    private sanitizador: DomSanitizer,
    private servicioArchivo: ArchivoService
  ) {}

  ngOnInit() {
    this.tipoGraf = graphType.line;
    this.dibujar();

    this.servicioArchivo.leer().subscribe(data => {
      console.log(data);
      // this.imagenData=data;
      this.convertir(data);
    });
  }

  dibujar() {
    this.servicioConsulta
      .listarResumen()
      .subscribe((data: ConsultaResumen[]) => {
        let ctx = this.graphRef.nativeElement;
        let cantidad = data.map(res => res.cantidad);
        let fecha = data.map(res => res.fecha);

        this.chart = new Chart(ctx, {
          type: this.tipoGraf,
          data: {
            labels: fecha,
            datasets: [
              {
                label: 'Cantidad',
                data: cantidad,
                borderColor: '#3cba9f',
                fill: false,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 0, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
                ]
              }
            ]
          },
          options: {
            legend: {
              display: true
            },
            scales: {
              xAxes: [
                {
                  display: true
                }
              ],
              yAxes: [
                {
                  display: true
                }
              ]
            }
          }
        });
      });
  }

  Cambiar(graphType: string) {
    this.tipoGraf = graphType;
    if (this.chart) {
      this.chart.destroy();
    }
    this.dibujar();
  }

  generarReporte() {
    // export class AppComponent {
    //   pdfSrc = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
    // }

    this.servicioConsulta.generarReporte().subscribe(data => {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        console.log(event.target.result);
        this.pdfSrc = event.target.result;
      };
      reader.readAsArrayBuffer(data);
    });
  }

  desacargarReporte() {
    this.servicioConsulta.generarReporte().subscribe(data => {
      // <a href dwnload descargar lo que esta en href
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none');
      a.href = url;
      a.download = 'archivo.pdf';
      a.click();
    });
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
    this.imagenEstado = !this.imagenEstado;
  }

  convertir(data: any) {
    let reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onload = () => {
      //falta sanitizador !!! error de peligro!!!!!!!!
      let datos = reader.result;
      this.setearSanitizar(datos);
    };
  }

  setearSanitizar(x: any) {
    this.imagenData = this.sanitizador.bypassSecurityTrustResourceUrl(x);
  }
}
