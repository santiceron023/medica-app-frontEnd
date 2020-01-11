import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SignosvitalesComponent } from './component/signosvitales.component';
import { SignosVitalesRoutingModule } from "./signosvitales-routing.module";
import { SignosvitalesEdicionComponent } from './component/signosvitales-edicion/signosvitales-edicion/signosvitales-edicion.component';
@NgModule({
    declarations: [SignosvitalesComponent, SignosvitalesEdicionComponent],
    imports: [ SharedModule, SignosVitalesRoutingModule ],
    entryComponents: [],
    exports: [],
    providers: [],
})
export class SignosVitalesModule { }
