import { Component } from '@angular/core';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { ConfigService } from './config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass', './app.component.css']
})
export class AppComponent {
  title = 'DirectoryClient';

  constructor(private oauthService: OAuthService, private configService: ConfigService){
    this.configureOAuth();
  }

  private configureOAuth(): void{
    this.oauthService.configure(this.configService.config.OAuth2Configuration);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  public getYear(): string{
    return new Date().getFullYear().toString();
  }
}
