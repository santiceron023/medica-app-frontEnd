import { TOKEN_NAME } from '../../shared/var.constants';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not401',
  templateUrl: './not401.component.html',
  styleUrls: ['./not401.component.css']
})
export class Not401Component implements OnInit {

  usuario: string;
  loggeado = false;
  linkIrANombre: string;

  constructor(private router: Router) { }

  ngOnInit() {
    const helper = new JwtHelperService();
    const token = sessionStorage.getItem(TOKEN_NAME);
    this.loggeado = token != null;
    if (this.loggeado) {
      const decodedToken = helper.decodeToken(token);
      this.usuario = decodedToken.user_name;
      this.linkIrANombre = 'pacientes';
    } else {
      this.usuario = 'usuario';
      this.linkIrANombre = 'login';
    }
  }

  pacientes() {
    if (this.loggeado) {
      this.router.navigateByUrl('/paciente');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

}
