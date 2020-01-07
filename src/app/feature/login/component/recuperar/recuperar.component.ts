import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/feature/login/service/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent implements OnInit {

  email: string;
  mensaje: string;
  error: string;
  percentage: number = undefined;

  constructor(
    private loginService: LoginService,
    private router: Router,
    public route: ActivatedRoute) { }

  ngOnInit() {
  }

  enviar() {
    this.percentage = 99;
    this.loginService.enviarCorreo(this.email).subscribe(
      (data) => {
        if (data != '0') {
          this.mensaje = 'Correo enviado'
          this.error = null;
          this.percentage = 100;
          // code before the pause
          // setTimeout(()=>
          // {
          //   this.router.navigateByUrl(`/recuperar/${data}`)
          // }, 2000);

        } else {
          this.mensaje = null;
          this.error = 'Correo no existe';
          this.percentage = 0;
        }
      }
    );
  }

}
