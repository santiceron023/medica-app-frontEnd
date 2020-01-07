export class Pageable<T> {
    content: Array<T>;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: string;
    numberOfElements: number;
    first: boolean;
}