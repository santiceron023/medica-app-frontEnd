import { Component, OnInit } from '@angular/core';
import '../login-animation.js';
import { LoginService } from '../_service/login.service.js';
import { MenuService } from '../_service/menu.service.js';
import { Router } from '@angular/router';
import { TOKEN_NAME } from '../_shared/var.constants.js';
import { Menu } from '../_model/menu.js';

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
    private login: LoginService,
    private menuService: MenuService,
    private router: Router
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    (window as any).initialize();
  }

  iniciarSesion() {
    this.login.login(this.usuario, this.clave).subscribe(data => {
      if (data) {
        let token = JSON.stringify(data);
        sessionStorage.setItem(TOKEN_NAME, token);

        this.menuService.listar().subscribe((data: Menu[]) => {
          this.menuService.menuCambio.next('se cargó data serv');
          this.router.navigateByUrl('paciente');
        });
      }
    });
  }
}
