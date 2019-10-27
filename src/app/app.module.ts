import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrotherDetailsComponent } from './brother-details/brother-details.component';
import { BrotherListComponent } from './brother-list/brother-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ConfigService} from './config.service';

@NgModule({
  declarations: [
    AppComponent,
    BrotherListComponent,
    BrotherDetailsComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (config: ConfigService) => () => config.fetchConfig(),
      deps: [ConfigService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
