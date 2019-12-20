import { Component, OnInit } from '@angular/core';
import '../login-animation.js';
import { LoginService } from '../_service/login.service.js';
import { MenuService } from '../_service/menu.service.js';
import { Router } from '@angular/router';
import { TOKEN_NAME } from '../_shared/var.constants.js';
import { Menu } from '../_model/menu.js';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tokenApi } from '../_model/token.js';

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
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    (window as any).initialize();
  }

  iniciarSesion() {
    this.login.login(this.usuario, this.clave).subscribe((data:tokenApi) => {
      console.log(`login INTENTADO con data -> ${JSON.stringify(data)}`);
      
      this.menuService.menuCambio.next(`login INTENTADO con data -> ${JSON.stringify(data)}`);
  
      if (data) {
   
        // let token = (JSON.parse(data)).access_token;
        let token = data.access_token;
        sessionStorage.setItem(TOKEN_NAME, token);

        this.menuService.menuCambio.next('login EJECUTADO ********');

        //descifrar
        const helper = new JwtHelperService();
        let tokenDecoded: any = helper.decodeToken(token);

        this.menuService
          .listarPorUsuario(tokenDecoded.user_name)
          .subscribe((data: Menu[]) => {
            console.log(`llegó el menu ${JSON.stringify(data)}`);
            // debugger;

            this.menuService.menuCambio.next('se cargó data serv');
            
            this.router.navigateByUrl('paciente');
          });
      }
    });
  }
}
