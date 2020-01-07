import { Not401Component } from './not401/not401.component';
import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { GuardService } from './guard/guard.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServerErrorsInterceptor } from './interceptor/serverErrorsInterceptor';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { TOKEN_NAME } from '../shared/var.constants';


export function tokenGetterFn() {
    const helper = new JwtHelperService();
    let token = sessionStorage.getItem(TOKEN_NAME);
    token = helper.isTokenExpired(token) ? null : token;
    return token != null ? token : '';
}


@NgModule({
    declarations: [Not401Component],
    imports:
        [
            CommonModule,
            JwtModule.forRoot({
                config: {
                    tokenGetter: tokenGetterFn,
                    // a quien sí token
                    // whitelistedDomains: ['localhost:4565'],
                    whitelistedDomains: ['52.67.254.91'],
                    // blacklistedRoutes
                }
            })
        ],
    exports: [],
    providers: [
        GuardService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ServerErrorsInterceptor,
            multi: true
        },

        // para la navegación en producción
        {
            provide: LocationStrategy, useClass: HashLocationStrategy
        }
    ],
})
export class CoreModule { }