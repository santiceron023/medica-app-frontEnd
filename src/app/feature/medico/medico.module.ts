import { SharedModule } from './../../shared/shared.module';
import { MedicoRoutingModule } from './medico-routing.module';
import { MedicoComponent } from './component/medico.component';
import { NgModule } from '@angular/core';
import { MedicoDialogoComponent } from 'src/app/feature/medico/component/dialogo/dialogo.component';

@NgModule({
    declarations: [MedicoComponent, MedicoDialogoComponent],
    imports: [ SharedModule, MedicoRoutingModule],
    exports: [],
    providers: [],
    entryComponents: [MedicoDialogoComponent]
})
export class MedicoModule {}