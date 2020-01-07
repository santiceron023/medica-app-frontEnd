import { SharedModule } from './../../shared/shared.module';
import { BuscarComponent } from './component/buscar.component';
import { DetalleDialogComponent } from './component/detalle-dialog/detalle-dialog.component';
import { NgModule } from '@angular/core';
import { BuscarRoutingModule } from './buscar-routing.module';

@NgModule({
    imports: [
        BuscarRoutingModule,
        SharedModule
    ],
    declarations: [
        BuscarComponent,
        DetalleDialogComponent
    ],
    entryComponents:
        [DetalleDialogComponent]
})
export class BuscarModule { }
