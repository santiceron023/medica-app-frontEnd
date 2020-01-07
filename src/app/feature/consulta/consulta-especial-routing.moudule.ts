import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ConsultaEspecialComponent } from './component/especial/especial.component';

const routes: Routes = [
    {
        path: '', component: ConsultaEspecialComponent,
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConsultaEspecialRoutingModule { }
