import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass', './navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private oauthService: OAuthService) { }

  ngOnInit() {
  }

  private initiateLogin(): void{
    this.oauthService.initCodeFlow();
  }

  private isLoginVisible(): boolean{
    return !this.oauthService.hasValidAccessToken();
  }

  private logOut(): void{
    this.oauthService.logOut();
  }

  get userFriendlyName(): string{
    let claims: any = this.oauthService.getIdentityClaims();
    return <string> claims['nickname'] || claims['name'];
  }
}
