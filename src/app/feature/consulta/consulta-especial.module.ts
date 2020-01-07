import { SharedModule } from './../../shared/shared.module';
import { ConsultaEspecialRoutingModule } from './consulta-especial-routing.moudule';
import { NgModule } from '@angular/core';
import { ConsultaEspecialComponent } from './component/especial/especial.component';

@NgModule({
    declarations: [ConsultaEspecialComponent],
    imports: [ SharedModule, ConsultaEspecialRoutingModule ],
    exports: [],
    providers: [],
})
export class ConsultaEspecialModule {}