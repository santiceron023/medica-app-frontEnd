import { Component, OnInit } from '@angular/core';
import '../../login/login-animation.js';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService } from 'src/app/feature/login/service/login.service.js';
import { Router } from '@angular/router';
import { tokenApi } from 'src/app/feature/login/shared/token.js';
import { TOKEN_NAME } from 'src/app/shared/var.constants.js';
import { MenuService } from 'src/app/core/menu/service/menu.service.js';
import { Menu } from 'src/app/core/menu/shared/menu.js';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: string;
  clave: string;
  mensaje: string = '';
  error: string = '';

  constructor(
    private menuService: MenuService,
    private login: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    (window as any).initialize();
  }

  iniciarSesion() {
    sessionStorage.clear();
    this.login.login(this.usuario, this.clave).subscribe((data: tokenApi) => {
      console.log(`login OK con data -> ${JSON.stringify(data)}`);

      if (data) {

        // let token = (JSON.parse(data)).access_token;
        const token = data.access_token;
        sessionStorage.setItem(TOKEN_NAME, token);

        // descifrar
        const helper = new JwtHelperService();
        const tokenDecoded: any = helper.decodeToken(token);

        this.menuService
          .listarPorUsuario(tokenDecoded.user_name)
          .subscribe((data: Menu[]) => {
            this.menuService.menuValorReactivo.next(data);
            this.router.navigateByUrl('/paciente');
          });
      }
    });
  }
}
