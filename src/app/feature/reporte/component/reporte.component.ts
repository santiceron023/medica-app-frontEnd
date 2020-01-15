import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConsultaService } from 'src/app/feature/consulta/service/consulta.service';
import { ConsultaResumen } from 'src/app/feature/reporte/shared/ConsultaResumen';
import { Chart } from 'chart.js';

export enum GRAPH_TYPES {
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
  pdfMessage: string;

  constructor(
    private servicioConsulta: ConsultaService
  ) { }

  ngOnInit() {
    this.tipoGraf = GRAPH_TYPES.line;
    this.dibujar();
    this.pdfMessage = 'ver PDF';
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

  cambiarTipoGraf(graphType: string) {
    this.tipoGraf = graphType;
    if (this.chart) {
      this.chart.destroy();
    }
    this.dibujar();
  }

  generarReporte() {
    //   pdfSrc = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
    // se lee y luego se setea el recultado a pdf source, es el equivalente a pasarle la url
    this.servicioConsulta.generarReporte().subscribe(data => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.pdfSrc = event.target.result;
      };
      reader.readAsArrayBuffer(data);
    });
  }

  desacargarReporte() {
    // se usa forma descarga nativa JavaScript
    // <a href dwnload descargar lo que esta en href
    this.servicioConsulta.generarReporte().subscribe(data => {
      const url = window.URL.createObjectURL(data);

      const a = document.createElement('a');
      a.setAttribute('style', 'display:none');
      a.href = url;
      a.download = 'archivo.pdf';
      a.click();
    });
  }
}
