import { Component } from '@angular/core';
import { LoginService } from './_service/login.service';
import { MenuService } from './_service/menu.service';
import { Menu } from './_model/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  menus:Menu[] = [];
  
  constructor(
    public loginService: LoginService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {   
    this.menuService.menuValorReactivo.subscribe(
      data => {
        console.log(`VALOR MENU NUMERO NEW -> ${data}`);
        this.menus = data;
      }
    )
    
  }
}
