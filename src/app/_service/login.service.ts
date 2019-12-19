import { Injectable } from '@angular/core';
import { HOST, TOKEN_NAME, API_CLIENT_ID, API_CLIENT_SECRET } from '../_shared/var.constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = `${HOST}/oauth/token`;
  constructor(private http: HttpClient) {}


  login(usuario: string, contrasena: string){
    const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(contrasena)}`;

    return this.http.post(this.url, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8').set('Authorization', 'Basic ' + btoa(API_CLIENT_ID + ':' + API_CLIENT_SECRET))
    });
  }

    estaLogeado(){
      let token = sessionStorage.getItem(TOKEN_NAME);
      return token != null;
    }

    cerrarSesion(){
      sessionStorage.clear();
    }
}
