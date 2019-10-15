import { ExamenEdicionComponent } from './pages/examen/examen-edicion/examen-edicion.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { EspecialiadEdicionComponent } from './pages/especialidad/especialiad-edicion/especialiad-edicion.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { PacienteEdicionComponent } from './pages/paciente/paciente-edicion/paciente-edicion.component';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  //predef
  // { path: '', redirectTo: '/paciente', pathMatch: 'full' },
  {
    path: 'paciente', component: PacienteComponent, children: [
      { path: 'nuevo', component: PacienteEdicionComponent },
      { path: 'edicion/:id', component: PacienteEdicionComponent }
    ]
  },
  {
    path: 'especialidad', component: EspecialidadComponent, children: [
      { path: 'nuevo', component: EspecialiadEdicionComponent },
      { path: 'edicion/:id', component: EspecialiadEdicionComponent }
    ]
  },
  {
    path: 'examen', component: ExamenComponent, children: [
      { path: 'nuevo', component: ExamenEdicionComponent },
      { path: 'edicion/:id', component: ExamenEdicionComponent }
    ]
  },
  { path: 'medico', component:MedicoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
