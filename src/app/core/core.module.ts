import { Not401Component } from './not401/not401.component';
import { NgModule } from '@angular/core';
import { GuardService } from './guard/guard.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorsInterceptor } from './interceptor/httpErrorsInterceptor';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { TOKEN_NAME } from '../shared/var.constants';
import { MatButtonModule, MatSnackBarModule } from '@angular/material';

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
            // material
            MatButtonModule,
            MatSnackBarModule,

            JwtModule.forRoot({
                config: {
                    tokenGetter: tokenGetterFn,
                    // a quien sí token
                    whitelistedDomains: ['localhost:4565'],
                    // whitelistedDomains: ['52.67.254.91'],
                    // blacklistedRoutes
                }
            })
        ],
    exports: [],
    providers: [
        GuardService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorsInterceptor,
            multi: true
        },
    ],
})
export class CoreModule { }
