import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { AccountSettingsService } from '../_services/account-settings.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent {

  IsWait: boolean= false;
  isAuthenticated: Observable<boolean>;
  isDoneLoading: Observable<boolean>;
  canActivateProtectedRoutes: Observable<boolean>;

  constructor(
    private authService: AuthService, 
    private http: HttpClient,
    private accountSettingsService: AccountSettingsService,
    ) {
    this.isAuthenticated = this.authService.isAuthenticated$;
    this.isDoneLoading = this.authService.isDoneLoading$;
    this.canActivateProtectedRoutes = this.authService.canActivateProtectedRoutes$;
    this.authService.runInitialLoginSequence();
  }

  login() { 
    this.authService.login();
  }
  logout() { this.authService.logout(); }
  refresh() { this.authService.refresh(); }
  reload() { window.location.reload(); }
  clearStorage() { localStorage.clear(); }
  getData(){

    this.http.get('http://localhost:5100/identity', {
      headers: new HttpHeaders({
        Authorization : `Bearer ${this.authService.accessToken}`
      })
    }).subscribe((data) => console.log(data));
  }

  deleteAccount(){
    this.accountSettingsService.deleteAccount();
  }


  logoutExternally() {
    window.open(this.authService.logoutUrl);
  }

  get hasValidToken() { return this.authService.hasValidToken(); }
  get accessToken() { 
    this.IsWait = true;
    return this.authService.accessToken; 
  }
  get refreshToken() { return this.authService.refreshToken; }
  get identityClaims() { return this.authService.identityClaims; }
  get idToken() { return this.authService.idToken; }

}
