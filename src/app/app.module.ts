import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { LoginModule } from './feature/login/login.module';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent
  ],

  entryComponents: [],
  imports: [
    CoreModule,
    AppRoutingModule,
    LoginModule,
    BrowserAnimationsModule,
    SharedModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
