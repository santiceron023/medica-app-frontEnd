export class FiltroConsulta{
    dni:string;
    nombreCompleto:string;
    fechaConsulta: Date;

    constructor(dni,nombreCompleto,fecha){
        this.dni = dni;
        this.nombreCompleto= nombreCompleto;
        this.fechaConsulta = fecha;
    }
}