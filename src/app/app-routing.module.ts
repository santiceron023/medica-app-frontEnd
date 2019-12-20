import { ReporteComponent } from './pages/reporte/reporte.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { EspecialComponent } from './pages/consulta/especial/especial.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { ExamenEdicionComponent } from './pages/examen/examen-edicion/examen-edicion.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { EspecialiadEdicionComponent } from './pages/especialidad/especialiad-edicion/especialiad-edicion.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { PacienteEdicionComponent } from './pages/paciente/paciente-edicion/paciente-edicion.component';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GuardService } from './_service/guard.service';
import { Not401Component } from './pages/not401/not401.component';
import { RecuperarComponent } from './login/recuperar/recuperar.component';
import { TokenComponent } from './login/recuperar/token/token.component';

const routes: Routes = [
  //predef
  // { path: '', redirectTo: '/paciente', pathMatch: 'full' },
  {
    path: 'paciente',
    component: PacienteComponent,
    children: [
      { path: 'nuevo', component: PacienteEdicionComponent },
      { path: 'edicion/:id', component: PacienteEdicionComponent }
    ],
    canActivate: [GuardService]
  },
  {
    path: 'especialidad',
    component: EspecialidadComponent,
    children: [
      { path: 'nuevo', component: EspecialiadEdicionComponent },
      { path: 'edicion/:id', component: EspecialiadEdicionComponent }
    ],
    canActivate: [GuardService]
  },
  {
    path: 'examen',
    component: ExamenComponent,
    children: [
      { path: 'nuevo', component: ExamenEdicionComponent },
      { path: 'edicion/:id', component: ExamenEdicionComponent }
    ],
    canActivate: [GuardService]
  },
  { path: 'medico', component: MedicoComponent, canActivate: [GuardService] },
  {
    path: 'consulta',
    component: ConsultaComponent,
    canActivate: [GuardService]
  },
  {
    path: 'consulta-especial',
    component: EspecialComponent,
    canActivate: [GuardService]
  },
  { path: 'buscar', component: BuscarComponent, canActivate: [GuardService] },
  { path: 'reporte', component: ReporteComponent, canActivate: [GuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'not-401', component: Not401Component },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  //recuperar/gfdhfhjgjytj
  {
  path: 'recuperar',
  component: RecuperarComponent,
  children: [
    { path: ':token', component: TokenComponent }
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
