import { Component } from '@angular/core';
import { LoginService } from './feature/login/service/login.service';
import { Menu } from './core/menu/shared/menu';
import { MenuService } from './core/menu/service/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  menus: Menu[] = [];

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
    );
    
  }
}
