import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

import { AppConfig } from '../app.config';

@Injectable()
export class AuthGuard {

  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let token: string = AppConfig.JWT_CONFIG.tokenGetter();
    let jwtHelper: JwtHelper = new JwtHelper();
    if (token && !jwtHelper.isTokenExpired(token)) {
      return true;
    }
    console.log("Route not authorized");
    this.router.navigate(['login']);
    return false;
  }
}
