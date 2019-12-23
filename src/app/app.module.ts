import { MaterialModule } from './material/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { PacienteEdicionComponent } from './pages/paciente/paciente-edicion/paciente-edicion.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MedicoComponent } from './pages/medico/medico.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { DialogoComponent } from './pages/medico/dialogo/dialogo.component';
import { EspecialiadEdicionComponent } from './pages/especialidad/especialiad-edicion/especialiad-edicion.component';
import { ExamenEdicionComponent } from './pages/examen/examen-edicion/examen-edicion.component';
import { EspecialComponent } from './pages/consulta/especial/especial.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { DetalleDialogComponent } from './pages/buscar/detalle-dialog/detalle-dialog.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { LoginComponent } from './login/login.component';
import { TOKEN_NAME } from './_shared/var.constants';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { GuardService } from './_service/guard.service';
import { Not401Component } from './pages/not401/not401.component';
import { RecuperarComponent } from './login/recuperar/recuperar.component';
import { TokenComponent } from './login/recuperar/token/token.component';
import { ServerErrorsInterceptor } from './_shared/serverErrorsInterceptor';
import { MatPaginatorIntl } from '@angular/material/paginator/typings/paginator-intl';
import { MatPaginatorImpl } from './_shared/mat-paginator';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

export function tokenGetterFn() {
  const helper = new JwtHelperService();

  ///ToDo: REVISAR SI ES VÁLIDO EL TOKEN!!!!!!!!
  let token = sessionStorage.getItem(TOKEN_NAME);
  token = helper.isTokenExpired(token) ? null : token;
  return token != null ? token : '';
}

@NgModule({
  declarations: [
    AppComponent,
    PacienteComponent,
    PacienteEdicionComponent,
    MedicoComponent,
    EspecialidadComponent,
    ExamenComponent,
    ConsultaComponent,
    DialogoComponent,
    EspecialiadEdicionComponent,
    ExamenEdicionComponent,
    EspecialComponent,
    BuscarComponent,
    DetalleDialogComponent,
    ReporteComponent,
    LoginComponent,
    Not401Component,
    RecuperarComponent,
    TokenComponent
  ],

  entryComponents: [DialogoComponent, DetalleDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PdfViewerModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    //formularios
    ReactiveFormsModule,
    FormsModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetterFn,
        // a quien sí token
        whitelistedDomains: ['localhost:4565'],
        // blacklistedRoutes
      }
    })
  ],
  // providers: [{ provide: LOCALE_ID, useValue: 'es-CO' }],
  bootstrap: [AppComponent],
  providers: [GuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorsInterceptor,
      multi: true
    },
    //para la navegación en producción
    {
      provide: LocationStrategy, useClass: HashLocationStrategy
    }
  ]
})
export class AppModule { }
