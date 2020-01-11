import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PerfilComponent } from './component/perfil/perfil.component';
import { PerfilRoutingModule } from './perfil-routing.module';

@NgModule({
    declarations: [PerfilComponent],
    imports: [ SharedModule, PerfilRoutingModule ],
    exports: [],
    providers: [],
})
export class PerfilModule { }
