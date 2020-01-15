import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatSnackBar, PageEvent } from '@angular/material';
import { Router } from '@angular/router';
import { FiltroConsultar } from '../../buscar/shared/filtroConsulta';
import { SignosvitalesService } from '../service/signosvitales.service';
import { SignosVitales } from '../shared/signosvitales';
import { PaginationRequestDto } from 'src/app/shared/model/PaginationRequestDto';
import { Pageable } from 'src/app/shared/material/pageable';

@Component({
  selector: 'app-signosvitales',
  templateUrl: './signosvitales.component.html',
  styleUrls: ['./signosvitales.component.css']
})
export class SignosvitalesComponent implements OnInit {

  form: FormGroup;
  maxFecha = new Date();
  puedeClick = true;

  cantidadRegTotal: number;
  configuracionPage: PaginationRequestDto;
  configuracionFiltro: FiltroConsultar;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  columns = [
    { columnDef: 'paciente', header: 'Nombre', cell: (element: SignosVitales) => `${element.paciente.nombres}` },
    { columnDef: 'fecha', header: 'Fecha', cell: (element: SignosVitales) => `${element.fecha}` },
    { columnDef: 'temperatura', header: 'Temperatura', cell: (element: SignosVitales) => `${element.temperatura}` },
    { columnDef: 'pulso', header: 'Pulso', cell: (element: SignosVitales) => `${element.pulso}` },
    { columnDef: 'ritmoRespiratorio', header: 'Ritmo Resp', cell: (element: SignosVitales) => `${element.ritmoRespiratorio}` }
  ];
  displayedColumns = this.columns.map(c => c.columnDef).concat(['acciones']);

  dataSource: MatTableDataSource<SignosVitales>;


  constructor(
    private router: Router,
    private snack: MatSnackBar,
    private signosService: SignosvitalesService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      dni: new FormControl(''),
      nombreCompleto: new FormControl(''),
      fechaConsulta: new FormControl()
    });

    this.listarTodo();

    this.signosService.cambioRealizado.subscribe(
      (reload: boolean) => {
        if (reload) {
          this.listarTodo();
          this.puedeClick = true;
          this.signosService.cambioRealizado.next(false);
          this.signosService.signoEditar = undefined;
        }
      }
    );
  }

  listarTodo() {
    // viene de la edición y tiene pag configurado
    this.configuracionPage = this.configuracionPage ? this.configuracionPage : new PaginationRequestDto(0, 5);
    this.configuracionFiltro = new FiltroConsultar(
      null, null, null, this.configuracionPage);
    this.listarPaginatedFiltro();
  }

  listarPaginatedFiltro() {
    this.signosService.listarPageableFiltro(this.configuracionFiltro).subscribe(
      (data: Pageable<SignosVitales>) => {
        this.dataSource = new MatTableDataSource(data.content);
        this.cantidadRegTotal = data.totalElements;
      }
    );
  }

  eliminar(id: number) {
    this.signosService.eliminar(id).subscribe(
      () => {
        this.signosService.cambioRealizado.next(true);
        const mensaje = 'Eliminado con éxito';
        this.snack.open(mensaje, 'mensaje', { duration: 2000 });
      }
    );
  }

  buscar() {
    this.configuracionFiltro = new FiltroConsultar(
      this.form.value.dni,
      this.form.value.nombreCompleto,
      this.form.value.fechaConsulta,
      this.configuracionPage
    );
    this.listarPaginatedFiltro();
  }

  crearModificar(element?: SignosVitales) {
    if (element) {
      this.signosService.signoEditar = element;
    }
    this.puedeClick = false;
    this.router.navigateByUrl('/signosvitales/edicion');
  }

  cambioPaginador(page: PageEvent) {
    this.configuracionPage = new PaginationRequestDto(page.pageIndex, page.pageSize);
    this.configuracionFiltro.pagina = this.configuracionPage;
    this.listarPaginatedFiltro();
  }

}
