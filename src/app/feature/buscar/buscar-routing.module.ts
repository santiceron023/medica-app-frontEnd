import { Routes, RouterModule } from "@angular/router";

import { BuscarComponent } from "./component/buscar.component";
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component: BuscarComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BuscarRoutingModule { }
