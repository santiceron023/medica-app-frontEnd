import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RecuperarComponent } from './component/recuperar/recuperar.component';
import { TokenComponent } from './component/recuperar/token/token.component';


const routes: Routes = [{
    path: '',
    component: RecuperarComponent,
    children: [
        { path: ':token', component: TokenComponent }
    ]
}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecuperaroutingModule { }
