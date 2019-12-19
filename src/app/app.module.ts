import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
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
    LoginComponent
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
    FormsModule
  ],
  // providers: [{ provide: LOCALE_ID, useValue: 'es-CO' }],
  bootstrap: [AppComponent]
})
export class AppModule {}
