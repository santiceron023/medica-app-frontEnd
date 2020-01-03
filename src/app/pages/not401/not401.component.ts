import { TOKEN_NAME } from './../../_shared/var.constants';
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

  constructor(private router:Router) { }

  ngOnInit() {
    const helper = new JwtHelperService();

    let token = sessionStorage.getItem(TOKEN_NAME);
    if(token){
    const decodedToken = helper.decodeToken(token);
    this.usuario = decodedToken.user_name;
    }else{
      this.usuario="usuario"
    }
  }

  pacientes(){
    this.router.navigateByUrl('/login');

  }

}
