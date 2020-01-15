import { DetalleDialogComponent } from './detalle-dialog/detalle-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {
  MatTableDataSource,
  MatPaginator,
  MatDialog,
  PageEvent
} from '@angular/material';
import { Consulta } from 'src/app/feature/consulta/shared/consulta';
import { ConsultaService } from 'src/app/feature/consulta/service/consulta.service';
import { FiltroConsultar } from 'src/app/feature/buscar/shared/filtroConsulta';
import { PaginationRequestDto } from 'src/app/shared/model/PaginationRequestDto';
import { Pageable } from 'src/app/shared/material/pageable';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  form: FormGroup;
  maxFecha: Date = new Date();

  displayedColumns = [
    'paciente', 'medico', 'especialidad',
    'fecha', 'acciones'
  ];
  dataSource: MatTableDataSource<Consulta>;

  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;
  cantidadRegTotal: number;
  configuracionPage: PaginationRequestDto;
  configuracionFiltro: FiltroConsultar;

  constructor(
    private consultaService: ConsultaService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      dni: new FormControl(''),
      nombreCompleto: new FormControl(''),
      fechaConsulta: new FormControl()
    });
    this.listarTodo();
  }

  listarTodo() {
    this.configuracionPage = new PaginationRequestDto(0, 5);
    this.configuracionFiltro = new FiltroConsultar(
      null, null, null, this.configuracionPage);
    this.listarPaginatedFiltro();
  }

  listarPaginatedFiltro() {
    this.consultaService.buscarPageableFiltro(this.configuracionFiltro).subscribe(
      (data: Pageable<Consulta>) => {
        this.dataSource = new MatTableDataSource(data.content);
        this.cantidadRegTotal = data.totalElements;
      }
    );
  }

  cambioPaginador(page: PageEvent) {
    this.configuracionPage = new PaginationRequestDto(page.pageIndex, page.pageSize);
    this.configuracionFiltro.pagina = this.configuracionPage;
    this.listarPaginatedFiltro();
  }

  buscar() {
    const filtro = new FiltroConsultar(
      this.form.value.dni,
      this.form.value.nombreCompleto,
      this.form.value.fechaConsulta,
      this.configuracionPage
    );

    filtro.nombreCompleto = filtro.nombreCompleto.toLowerCase();
    // desde las 0 horas
    if (filtro.fechaConsulta) {
      filtro.fechaConsulta.setHours(0);
      filtro.fechaConsulta.setMinutes(0);
      filtro.fechaConsulta.setSeconds(0);
      filtro.fechaConsulta.setMilliseconds(0);

      delete filtro.dni;
      delete filtro.nombreCompleto;

    } else {
      // limpiar los elementos que no son los de búsqueda
      delete filtro.fechaConsulta;

      if (filtro.dni.length === 0) {
        delete filtro.dni;
      }

      if (filtro.nombreCompleto.length === 0) {
        delete filtro.nombreCompleto;
      }
    }
    this.configuracionFiltro = filtro;
    this.listarPaginatedFiltro();
  }

  verDetalle(consulta: Consulta) {
    this.dialog.open(DetalleDialogComponent, {
      data: consulta
    });
  }
}
