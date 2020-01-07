import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../../feature/login/service/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TOKEN_NAME } from '../../shared/var.constants';
import { map } from 'rxjs/operators';
import { MenuService } from '../menu/service/menu.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {
  constructor(
    private loginService: LoginService,
    private menuService: MenuService,
    private router: Router
    ) { }

  canActivate(
    route: import('@angular/router').ActivatedRouteSnapshot,
    state: import('@angular/router').RouterStateSnapshot
  ):
    | boolean
    | import('@angular/router').UrlTree
    | import('rxjs').Observable<boolean | import('@angular/router').UrlTree>
    | Promise<boolean | import('@angular/router').UrlTree> {

    const helper = new JwtHelperService();

    const log = this.loginService.estaLogeado();
    const token = sessionStorage.getItem(TOKEN_NAME);
    if (log) {
      if (helper.isTokenExpired(token)) {
        this.irInicio();
      }
      // roles de usuario
      // const tokenDecoded = helper.decodeToken(token);
      // 1 url
      const url = state.url;

      // 2 menu del user
      // si se usa SSUBSCRIBE error de sync
      // return this.menuService.listarPorUsuario(tokenDecoded.user_name).pipe(
      //   map(
      //     data => {
      //       this.menuService.menuValorReactivo.next(data);

      //        // 3 comparar
      //       const auxPermiso = data.find(item => item.url === url);
      //       if (!auxPermiso) {
      //         console.log("usuario sin permiso");
      //         this.irInicio();
      //       } else {
      //         return true;
      //       }
      //     })
      // );

      //  3 comparar
      const auxPermiso = this.menuService.menuValorReactivo.value.find(
        item => item.url === url
      );
      // Si no está, no tiene permiso
      if (!auxPermiso) {
        console.log("usuario sin permiso");
        this.irInicio();
      } else {
        return true;
      }

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
