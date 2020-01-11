export class FiltroConsultar {
    dni:string;
    nombreCompleto:string;
    fechaConsulta: Date;

    constructor(dni,nombreCompleto,fecha){
        this.dni = dni;
        this.nombreCompleto= nombreCompleto;
        this.fechaConsulta = fecha;
    }
}