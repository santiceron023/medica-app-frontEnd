import { Component } from '@angular/core';
import { LoginService } from './_service/login.service';
import { MenuService } from './_service/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private loginService: LoginService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    
    this.menuService.menuCambio.subscribe(data => {  
      console.log(`APP COMPO datos de subscripcion: ${JSON.stringify(data)}`);
        
      // this.menus = data;
    });
  }
}
