import { Injectable } from '@angular/core';
import { HOST, TOKEN_NAME, API_CLIENT_ID, API_CLIENT_SECRET } from '../_shared/var.constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tokenApi } from '../_model/token';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  urltoken: string = `${HOST}/oauth/token`;
  urltokenAnular: string = `${HOST}/usuarios/anular`;
  constructor(private http: HttpClient,
    private router: Router) { }


  login(usuario: string, contrasena: string): Observable<tokenApi> {
    const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(contrasena)}`;

    return this.http.post<tokenApi>(this.urltoken, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8').set('Authorization', 'Basic ' + btoa(API_CLIENT_ID + ':' + API_CLIENT_SECRET))
    });
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
}
