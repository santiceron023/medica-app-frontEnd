import { SharedModule } from './../../shared/shared.module';
import { EspecialiadEdicionComponent } from './component/especialiad-edicion/especialiad-edicion.component';
import { EspecialidadComponent } from './component/especialidad.component';
import { NgModule } from '@angular/core';
import { EspecialidadRoutingModule } from './especialidad-routing.module';

@NgModule({
    declarations: [EspecialidadComponent, EspecialiadEdicionComponent],
    imports: [ EspecialidadRoutingModule, SharedModule],
    exports: [],
    providers: [],
})
export class EspeciaidadModule {}