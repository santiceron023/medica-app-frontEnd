import { Pageable } from './../../_model/pageable';
import { Paciente } from './../../_model/paciente';
import { PacienteService } from './../../_service/paciente.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar, PageEvent } from '@angular/material';


@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  dataSource: MatTableDataSource<Paciente>;
  pacientes: Paciente[];
  cantidadRegTotal:number;
  displayedColumns: string[] = ['idPaciente', 'nombres', 'apellidos', 'acciones'];
  

  @ViewChild(MatSort, { static: false })
  sort: MatSort;
  // @ViewChild(MatPaginator, { static: false })
  // paginator: MatPaginator;

  constructor(private pacService: PacienteService,
    private snack: MatSnackBar) {
  }

  ngOnInit() {
    this.listar(0,5);

    this.pacService.pacienteCambio.subscribe(
      (data: Paciente[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
      });

    this.pacService.mensajeCambio.subscribe(
      (data: string) => {
        this.snack.open(data, 'AVISO',
          {
            duration: 2000
          });
      });

  }

    
  // listar() {
  //   this.pacService.listar().subscribe((data) => {
  //     this.dataSource = new MatTableDataSource(data);
  //     this.dataSource.sort = this.sort;
  //     this.dataSource.paginator = this.paginator;
  //   }
  //   );
  // }


  listar(pageNumber:number,pageSize:number) {
    this.pacService.listarPageable(pageNumber,pageSize).subscribe((data: Pageable<Paciente>) => {
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
      this.cantidadRegTotal = data.totalElements
      // ya no se usa, desorganiza el sobreescribirlo
      // this.dataSource.paginator = this.paginator;
    }
    );
  }

  cambioPaginador(page:PageEvent){
    this.listar(page.pageIndex,page.pageSize);

  }

  eliminar(id) {
    this.pacService.eliminar(id).subscribe((data) => {
      console.log(data);
      this.pacService.listar().subscribe(data => {
        this.pacService.pacienteCambio.next(data);
        this.pacService.mensajeCambio.next('SE ELIMINÓ');
      });
    }
    );
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
