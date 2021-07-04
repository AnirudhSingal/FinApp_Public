import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Observable, combineLatest } from 'rxjs';
import {map} from 'rxjs/operators';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();

  private isDoneLoadingSubject$ = new ReplaySubject<boolean>();
  public isDoneLoading$ = this.isDoneLoadingSubject$.asObservable();

  public canActivateProtectedRoutes$: Observable<boolean> = combineLatest([
    this.isAuthenticated$,
    this.isDoneLoading$
  ]).pipe(map(values => values.every(b => b )));



  constructor(private oauthService: OAuthService,
              private router: Router) {}

  public runInitialLoginSequence(): Promise<void> {
    if (location.hash) {
      console.log('Encountered hash fragment, plotting as table...');
      console.table(location.hash.substr(1).split('&').map(kvp => kvp.split('=')));
    }

    return this.oauthService.loadDiscoveryDocument()

      .then(() => new Promise (resolve => setTimeout(() => resolve(), 1000)))

      .then(() => this.oauthService.tryLogin())

      .then(() => {
        if (this.oauthService.hasValidAccessToken()) {
          return Promise.resolve();
        }

        return  this.oauthService.silentRefresh()
          .then(() => Promise.resolve())
          .catch(result => {
            const errorResponsesRequiringUserInteraction = [
              'interaction_required',
              'login_required',
              'account_selection_required',
              'consent_required',
            ];

            if (result
              && result.reason
              && errorResponsesRequiringUserInteraction.indexOf(result.reason.error) >= 0) {

                console.warn('User interaction is needed to log in, we will wait for the user to manually log in.');
                return Promise.resolve();

            }
            return Promise.reject(result);
          });
      })

      .then(() => {
        this.isDoneLoadingSubject$.next(true);

        if (this.oauthService.state && this.oauthService.state !== 'undefined' && this.oauthService.state !== 'null') {
          let stateUrl = this.oauthService.state;
          if (stateUrl.startsWith('/') === false) {
            stateUrl = decodeURIComponent(stateUrl);
          }
          console.log(`There was state of ${this.oauthService.state}, so we are sending you to: ${stateUrl}`);
          this.router.navigateByUrl(stateUrl);
        }
      })
      .catch(() => this.isDoneLoadingSubject$.next(true));
    }

    public login(targetUrl?: string) {
      this.oauthService.initCodeFlow();
      // this.oauthService.initLoginFlow(targetUrl || this.router.url);
    }

    public logout() { this.oauthService.logOut(); }
    public refresh() { this.oauthService.silentRefresh(); }
    public hasValidToken() { return this.oauthService.hasValidAccessToken(); }

    public get accessToken() { return this.oauthService.getAccessToken(); }
    public get refreshToken() { return this.oauthService.getRefreshToken(); }
    public get identityClaims() { return this.oauthService.getIdentityClaims(); }
    public get idToken() { return this.oauthService.getIdToken(); }
    public get logoutUrl() { return this.oauthService.logoutUrl; }
  }
