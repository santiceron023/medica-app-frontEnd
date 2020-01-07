import { SharedModule } from './../../shared/shared.module';
import { PacienteRoutingModule } from './paciente-routing.module';
import { PacienteComponent } from './component/paciente.component';
import { NgModule } from '@angular/core';
import { PacienteEdicionComponent } from 'src/app/feature/paciente/component/paciente-edicion/paciente-edicion.component';

@NgModule({
    declarations: [PacienteEdicionComponent, PacienteComponent],
    imports: [ SharedModule, PacienteRoutingModule ],
    exports: [],
    providers: [],
})
export class PacienteModule {}