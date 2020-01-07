import { SharedModule } from './../../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { NgModule } from '@angular/core';
import { LoginComponent } from './component/login.component';

@NgModule({
    declarations: [LoginComponent],
    imports: [ LoginRoutingModule, SharedModule],
    // exports: [],
    // providers: [],
})
export class LoginModule { }