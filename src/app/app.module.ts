import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule, JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrotherDetailsComponent } from './brother-details/brother-details.component';
import { BrotherListComponent } from './brother-list/brother-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ConfigService } from './config.service';

@NgModule({
  declarations: [
    AppComponent,
    BrotherListComponent,
    BrotherDetailsComponent,
    NavbarComponent,
  ],
  imports: [
    OAuthModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
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
