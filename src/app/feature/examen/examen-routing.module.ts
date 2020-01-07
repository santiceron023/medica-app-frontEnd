import { ExamenComponent } from './component/examen.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ExamenEdicionComponent } from './component/examen-edicion/examen-edicion.component';


const routes: Routes = [
    { path: '', component: ExamenComponent,
     children: [
        { path: 'nuevo', component: ExamenEdicionComponent },
        { path: 'edicion/:id', component: ExamenEdicionComponent }
      ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExamenRoutingModule {}
