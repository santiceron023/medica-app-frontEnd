import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TOKEN_NAME } from 'src/app/shared/var.constants';
import { JwtDecodedToken } from 'src/app/shared/model/jwtDecodedToken';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  nombreUsuario: string;
  roles: string[];

  constructor() { }

  ngOnInit() {
    const helper = new JwtHelperService();
    const tokenInfo: JwtDecodedToken = helper.decodeToken(sessionStorage.getItem(TOKEN_NAME));
    this.roles = tokenInfo.authorities;
    this.nombreUsuario = tokenInfo.user_name;
  }

}
