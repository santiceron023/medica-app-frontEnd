import { HOST, TOKEN_NAME, API_CLIENT_ID, API_CLIENT_SECRET } from '../_shared/var.constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { tokenApi } from '../_model/token';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  urltoken: string = `${HOST}/oauth/token`;
  urltokenAnular: string = `${HOST}/usuarios/anular`;
  urlLogin: string = `${HOST}/login`;
  constructor(private http: HttpClient,
    private router: Router) { }


  login(usuario: string, contrasena: string): Observable<tokenApi> {
    const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(contrasena)}`;

    return this.http.post<tokenApi>(this.urltoken, body, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .set('Authorization', 'Basic ' + btoa(API_CLIENT_ID + ':' + API_CLIENT_SECRET))
    });
  }

  verificarTokenReset(token: string) {
    return this.http.get<number>(`${this.urlLogin}/restablecer/verificar/${token}`);
  }

  restablecer(token: string, clave: string) {
    return this.http.post<number>(`${this.urlLogin}/restablecer/${token}`,
      clave, {
      headers: new HttpHeaders().set('Content-Type', 'text/plain')
    }
    );
  }




  estaLogeado() {
    let token = sessionStorage.getItem(TOKEN_NAME);
    return token != null;
  }

  cerrarSesion() {
    let token = sessionStorage.getItem(TOKEN_NAME);
    this.http.get(`${this.urltokenAnular}/${token}`).subscribe(
      data => {
        sessionStorage.clear();
        this.router.navigateByUrl("/login");
      });
  }


  enviarCorreo(correo: string) {
    return this.http.post<string>(`${this.urlLogin}/enviarCorreo`, correo, {
      // headers: new HttpHeaders().set('Content-Type', 'text/plain')
    }
    );

  }
}
