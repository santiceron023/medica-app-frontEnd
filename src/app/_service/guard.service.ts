import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TOKEN_NAME } from '../_shared/var.constants';
import { MenuService } from './menu.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {
  constructor(private loginService: LoginService,
    private menuService: MenuService,
     private router: Router) {}

  canActivate(
    route: import('@angular/router').ActivatedRouteSnapshot,
    state: import('@angular/router').RouterStateSnapshot
  ):
    | boolean
    | import('@angular/router').UrlTree
    | import('rxjs').Observable<boolean | import('@angular/router').UrlTree>
    | Promise<boolean | import('@angular/router').UrlTree> {

    const helper = new JwtHelperService();

    let log = this.loginService.estaLogeado();
    let token = sessionStorage.getItem(TOKEN_NAME);
    if (log) {
      if (helper.isTokenExpired(token)) {
        this.irInicio();
      }
      //roles de usuario
      const tokenDecoded = helper.decodeToken(token);
      //1 url
      let url = state.url;

      //2 menu del user
      //si se usa SSUBSCRIBE error de sync
      return this.menuService.listarPorUsuario(tokenDecoded.user_name).pipe(
         map(
          data => {
          // debugger;
          this.menuService.menuCambio.next('carga del menu desde guard');
          this.menuService.menuValorReactivo.next(data);
          
          //3 comparar
          let auxPermiso = data.find(item=> item.url == url);
          if(!auxPermiso){
            console.log("usuario sin permioso");
            
            this.irInicio();
          }else{
            return true;
          }        
        })
      );
      
    
      } else {
      this.irInicio();
    }
  }

  irInicio() {
    sessionStorage.clear();
    this.router.navigate(['not-401']);
    return false;
  }
}
