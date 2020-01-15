export class PaginationRequestDto {
    tamano: number;
    pagina: number;
    // sortBy: string;

    constructor(numPag: number, tamano: number) {
        this.tamano = tamano;
        this.pagina = numPag;
    }
}
