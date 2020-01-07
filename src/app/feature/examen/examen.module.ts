import { SharedModule } from './../../shared/shared.module';
import { ExamenComponent } from './component/examen.component';
import { ExamenRoutingModule } from './examen-routing.module';
import { NgModule } from '@angular/core';
import { ExamenEdicionComponent } from './component/examen-edicion/examen-edicion.component';

@NgModule({
    declarations: [
        ExamenComponent,
        ExamenEdicionComponent
    ],
    imports: [
        SharedModule,
        ExamenRoutingModule
    ],
    exports: [],
    providers: [],
})
export class ExamenModule {}