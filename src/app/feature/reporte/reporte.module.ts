import { SharedModule } from './../../shared/shared.module';
import { ReporteRoutingModule } from './reporte-routing.module';
import { NgModule } from '@angular/core';
import { ReporteComponent } from './component/reporte.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ArchivoService } from '../archivo/service/archivo.service';

@NgModule({
    declarations: [ReporteComponent],
    imports: [ SharedModule, ReporteRoutingModule, PdfViewerModule ],
    exports: [],
    providers: [ArchivoService],
})
export class ReporteModule { }
