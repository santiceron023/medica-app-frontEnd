import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatchPassword } from './MatchPassword';
import { LoginService } from 'src/app/feature/login/service/login.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {
  form: FormGroup;
  token: string;
  mensaje: string;
  error: string;
  rta: number;
  tokenValido: boolean;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formCreate();
    this.route.params.subscribe((params: Params) => {
      this.token = params['token'];
      this.tokenValido = true;
      this.loginService.verificarTokenReset(this.token).subscribe(data => {
        if (data === 1) {
          this.tokenValido = true;
        } else {
          this.tokenValido = false;
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 2000);
        }
      }
      );
    }
    );
  }

  onSubmit() {
    const clave: string = this.form.value.passwordConfirm;
    this.loginService.restablecer(this.token, clave).subscribe(data => {
      if (data === 1) {
        this.rta = 1;
      }
    }, err => {

    });
  }


  formCreate() {
    this.form = this.formBuilder.group({
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    }, {
      validators: MatchPassword.MatchPassword.bind(this)
    });
  }

}
