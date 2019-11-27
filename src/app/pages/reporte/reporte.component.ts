import { Component, OnInit } from '@angular/core';


export enum graphType{
  line="line",
  bar="bar",
  doughnut="doughtnut",
  radar="radar",
  pie="pie"
}

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  chart:any;
  tipoGraf:string;

  constructor() { }

  ngOnInit() {
    this.tipoGraf = graphType.line;
    this.dibujar();
  }

  dibujar(){
    
  }

  cambiar(graphType:string){

  }


}
