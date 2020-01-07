import { SharedModule } from './../../shared/shared.module';
import { RecuperaroutingModule } from './recuperar-routing.module';
import { NgModule } from '@angular/core';
import { TokenComponent } from './component/recuperar/token/token.component';
import { RecuperarComponent } from './component/recuperar/recuperar.component';

@NgModule({
    declarations: [TokenComponent, RecuperarComponent],
    imports: [ SharedModule, RecuperaroutingModule ],
    exports: [],
    providers: [],
})
export class RecuperarModule {}