import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HOST, TOKEN_NAME } from 'src/app/shared/var.constants';
import { Menu } from '../shared/menu';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  url: string = `${HOST}/menus`;
  menuValorReactivo = new BehaviorSubject<Menu[]>(new Array<Menu>());

  // inyeccion de dep
  constructor(private http: HttpClient) {}

  listar() {
    const token = sessionStorage.getItem(TOKEN_NAME);
    return this.http.get<Menu[]>(`${this.url}`, {
      headers: new HttpHeaders()
        .set('Authorization', `bearer ${token}`)
        .set('content-type', 'application/json')
    });
  }

  listarPorUsuario(username: string) {
    const token = sessionStorage.getItem(TOKEN_NAME);
    return this.http.post<Menu[]>(`${this.url}/usuario`,username, {
      headers: new HttpHeaders()
        .set('Authorization', `bearer ${token}`)
        .set('content-type', 'application/json')
    });
  }
}
