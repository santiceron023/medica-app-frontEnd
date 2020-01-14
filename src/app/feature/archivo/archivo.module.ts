import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArchivoRoutingModule } from './archivo-routing.module';
import { ArchivoComponent } from './component/archivo/archivo.component';
import { ArchivoService } from './service/archivo.service';
import { MostrarInfoArchivoPipe } from './shared/mostrar-info-archivo.pipe';

@NgModule({
    declarations: [ArchivoComponent, MostrarInfoArchivoPipe],
    imports: [ SharedModule, ArchivoRoutingModule],
    exports: [],
    providers: [ ArchivoService ],
})
export class ArchivoModule { }
