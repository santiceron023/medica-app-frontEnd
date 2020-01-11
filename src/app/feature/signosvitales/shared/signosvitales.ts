import { Paciente } from '../../paciente/shared/paciente';

export class SignosVitales {
    id: number;
    paciente: Paciente;
    // fecha: '2019-10-16T17:47:01.089Z'
    fecha: string;
    temperatura: number;
    pulso: number;
    ritmoRespiratorio: number;

    constructor(
        id: number,
        paciente: Paciente,
        fecha: string,
        temperatura: number,
        pulso: number,
        ritmoRespiratorio: number) {
        this.id = id;
        this.paciente = paciente;
        this.fecha = fecha;
        this.temperatura = temperatura;
        this.pulso = pulso;
        this.ritmoRespiratorio = ritmoRespiratorio;

    }
}