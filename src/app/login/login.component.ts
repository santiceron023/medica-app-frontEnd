import { Component, OnInit } from '@angular/core';
import '../login-animation.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: string;
  clave: string;
  mensaje: string = "";
  error: string = "";
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    (window as any).initialize();
  }

}
