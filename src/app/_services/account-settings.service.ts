import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AccountSettingsService {

  constructor(private http: HttpClient, private oauthService: OAuthService) { }
  
  baseUrl = environment.authUrl;

  public deleteAccount() {
    var access_token = this.oauthService.getAccessToken();
    var auth_token = 'Bearer ' + access_token;

    const headers =  new HttpHeaders({
      'Authorization': auth_token
    });


    this.http.get(this.baseUrl  + 'AccountSettings/Delete/');

  }

}
