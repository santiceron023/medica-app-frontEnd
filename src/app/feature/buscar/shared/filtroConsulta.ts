import { PaginationRequestDto } from 'src/app/shared/model/PaginationRequestDto';

export class FiltroConsultar {
    dni: string;
    nombreCompleto: string;
    fechaConsulta: Date;
    pagina: PaginationRequestDto;

    constructor(dni, nombreCompleto, fecha, page) {
        this.dni = dni;
        this.nombreCompleto = nombreCompleto;
        this.fechaConsulta = fecha;
        this.pagina = page;
    }

}
