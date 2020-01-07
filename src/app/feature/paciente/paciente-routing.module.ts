import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PacienteComponent } from './component/paciente.component';
import { PacienteEdicionComponent } from './component/paciente-edicion/paciente-edicion.component';

const routes: Routes = [
    {
        path: '', component: PacienteComponent
        , children: [
            { path: 'nuevo', component: PacienteEdicionComponent },
            { path: 'edicion/:id', component: PacienteEdicionComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PacienteRoutingModule { }
