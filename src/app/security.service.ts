import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import { AppConfig } from './app.config';

@Injectable()
export class SecurityService {

  private url: string = 'http://127.0.0.1:8000/login_check';

  constructor(private http: Http) { }

  login(username: string, password: string, rememberMe: boolean) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    let params: URLSearchParams = new URLSearchParams();
    params.set('username', username);
    params.set('password', password);
    return this.http.post(this.url, params, options)
      .catch(error => {
        let errorCode = error.status == 401 ? 'unauthorized' : 'error';
        return Observable.throw(errorCode);
      })
      .do(response => {
        let token = response.json()['token'];
        let tokenName = AppConfig.JWT_CONFIG.tokenName;
        if (rememberMe) {
          sessionStorage.removeItem(tokenName);
          localStorage.setItem(tokenName, token);
        } else {
          sessionStorage.setItem(tokenName, token);
          localStorage.removeItem(tokenName);
        }
      });
  }

  logout() {
    let tokenName = AppConfig.JWT_CONFIG.tokenName;
    sessionStorage.removeItem(tokenName);
    localStorage.removeItem(tokenName);
  }
}
