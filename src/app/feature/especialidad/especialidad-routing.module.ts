import { EspecialidadComponent } from './component/especialidad.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EspecialiadEdicionComponent } from 'src/app/feature/especialidad/component/especialiad-edicion/especialiad-edicion.component';


const routes: Routes = [
    {
        path: '', component: EspecialidadComponent,
        children: [
            { path: 'nuevo', component: EspecialiadEdicionComponent },
            { path: 'edicion/:id', component: EspecialiadEdicionComponent }
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EspecialidadRoutingModule { }
