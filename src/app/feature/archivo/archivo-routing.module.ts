import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ArchivoComponent } from './component/archivo/archivo.component';

const routes: Routes = [
    { path: '', component: ArchivoComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArchivoRoutingModule { }
