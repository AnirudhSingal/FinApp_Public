import { Component, OnInit, OnDestroy } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { CacheTransactionsService } from './_services/caching/cache-transactions.service';
import { ActivatedRoute, Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterStateSnapshot, ActivatedRouteSnapshot, RouterState, ResolveStart, ResolveEnd } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';

import * as ResizeSensor from 'src/assets/js/resizeSensor.js';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit, OnDestroy {

// isAuthenticated: boolean;
// userData: any;
// headers: HttpHeaders;

// constructor(public oidcSecurityService: OidcSecurityService,
//             public http: HttpClient ) {
//   if (this.oidcSecurityService.moduleSetup) {
//     this.doCallBackLogicIfRequired();
//   } else {
//     this.oidcSecurityService.onModuleSetup.subscribe(() => {
//       this.doCallBackLogicIfRequired();
//     });
//   }
// }

// private doCallBackLogicIfRequired() {
//   this.oidcSecurityService.authorizedCallbackWithCode(window.location.toString());
// }

// ngOnDestroy(): void {}
// ngOnInit(): void {
//   this.oidcSecurityService.getIsAuthorized().subscribe(auth => {
//     this.isAuthenticated = auth;
//     console.log('Authentication status : '  + auth);
//   });

//   this.oidcSecurityService.getUserData().subscribe(userData => {
//     this.userData = userData;
//   });
// }

// login() {
//   this.oidcSecurityService.authorize();
// }

// getData() {

//   this.headers = new HttpHeaders();
//   this.headers = this.headers.set('Authorization' , `Bearer ${this.oidcSecurityService.getToken()}`);

//   this.http.get('http://localhost:5100/identity', {headers: this.headers}).subscribe(next => {
//     console.log('Result: ' + next.toString()); }, error => {
//       console.log(error.toString());
//     });
// }

// logout() {
//   this.oidcSecurityService.logoff();
// }
// }


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  componentRef: any;
  isDataLoaded = new BehaviorSubject(null);




  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cacheTransactionsService: CacheTransactionsService,
  ) {
    ResizeSensor;
    this.router.events.subscribe((event: RouterEvent) => {
      this.checkRouterEvent(event);
    })
  }


  checkRouterEvent(routerEvent: RouterEvent): void {
    if (routerEvent instanceof NavigationStart) {
      this.isDataLoaded.next(false);
    }
    if (routerEvent instanceof ResolveEnd) {
      this.isDataLoaded.next(true);
    }
  }


  ngOnInit(): void {
    this.cacheTransactionsService.ConnectToIDB().then(() => {
    });
  }
  onActivate(event){
    event.isDataLoaded = this.isDataLoaded;
  }

}

