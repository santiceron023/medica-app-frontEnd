import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SignosvitalesComponent } from './component/signosvitales.component';
import { SignosvitalesEdicionComponent } from './component/signosvitales-edicion/signosvitales-edicion/signosvitales-edicion.component';

const routes: Routes = [
    {
        path: '', component: SignosvitalesComponent,
        children:
            [
                { path: 'edicion', component: SignosvitalesEdicionComponent }
            ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SignosVitalesRoutingModule { }
