import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Observable, EMPTY } from 'rxjs';
import { retry, tap, catchError } from 'rxjs/operators';
import { REINTENTOS } from './var.constants';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class ServerErrorsInterceptor implements HttpInterceptor {

    constructor(private snackBar: MatSnackBar) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(retry(REINTENTOS))
            .pipe(tap(event => {
                //tipo hhtp
                if (event instanceof HttpResponse) {
                    if (event.body && event.body.error === true && event.body.errorMessage) {
                        throw new Error(event.body.errorMessage);
                    }/*else{
                        this.snackBar.open("EXITO", 'AVISO', { duration: 5000 });    
                    }*/
                }
            })).pipe(catchError((err) => {
                console.log(JSON.stringify(err));
                //https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
                if (err.status === 400) {
                    this.snackBar.open(err.mensaje, 'ERROR 400', { duration: 5000 });
                }
                else if (err.status === 401) {
                    this.snackBar.open(err.message, 'ERROR 401', { duration: 5000 });
                    //this.router.navigate(['/login']);
                }
                else if (err.status === 500) {
                    this.snackBar.open(err.error.mensaje, 'ERROR 500', { duration: 5000 });
                } else {
                    this.snackBar.open(err.error.mensaje, 'ERROR', { duration: 5000 });
                }
                //empty es un obs vacío
                return EMPTY;
            }));
    }
}