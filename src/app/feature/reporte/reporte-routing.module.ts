import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReporteComponent } from './component/reporte.component';

const routes: Routes = [
    { path: '', component: ReporteComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReporteRoutingModule {}
