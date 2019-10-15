import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    ExamenEdicionComponent
  ],

  entryComponents:
    [DialogoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    //formularios
    ReactiveFormsModule,

    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
