import { SharedModule } from './../../shared/shared.module';
import { ConsultaRoutingModule } from './consulta-routing.moudle';
import { NgModule } from '@angular/core';
import { ConsultaComponent } from './component/consulta.component';

@NgModule({
    declarations: [ConsultaComponent],
    imports: [ SharedModule, ConsultaRoutingModule ],
    exports: [],
    providers: [],
})
export class ConsultaModule {}