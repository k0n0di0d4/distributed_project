import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {catchError} from 'rxjs';
import {ApiPaths} from 'src/environments/ApiPaths';
import {environment} from 'src/environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {User} from '../models/user';
import {RegisterModel} from '../models/register-model';
import {LoginModel} from '../models/login-model';
import {CookieService} from 'ngx-cookie-service';
import {TokenModel} from '../models/token-model';
import {GlobalErrorHandlerService} from './global-error-handler.service';
import {MessageService} from './message.service';
import {WebsocketService} from './web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = environment.baseUrl;
  private authenticationTokenCookieName: string = 'AuthenticationToken';
  private usernameCookie: string = 'UsernameCookie';

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private globalErrorHandler: GlobalErrorHandlerService,
    private router: Router) {

  }

  public setAuthenticationToken(token: string) {
    this.cookieService.set(this.authenticationTokenCookieName, token);
  }

  public setUsernameCookie(login: string) {
    if (login !== null && login !== undefined) {
      this.cookieService.set(this.usernameCookie, login);
    }
  }

  public getAccessToken(): string {
    // const accessToken = this.cookieService.get(this.authenticationTokenCookieName);
    // const isTokenExpired = (token: string) => Date.now() >= (JSON.parse(atob(token.split('.')[1]))).exp * 1000
    // const headers = { 'accept': 'application/json', 'Content-Type': 'application/json' };
    // const body = { accessToken: accessToken };

    // if (isTokenExpired(accessToken)) {
    //   this.httpClient.post<string>(this.url + '/RefreshToken', body, { headers: headers })
    //     .pipe(
    //       catchError(this.globalErrorHandler.handleError)
    //     )
    //     .subscribe(newAccessToken => this.cookieService.set(this.authenticationTokenCookieName, newAccessToken))//now return token object, return only string
    // }
    return this.cookieService.get(this.authenticationTokenCookieName);
  }

  public getUsernameCookie(): string {
    return this.cookieService.get(this.usernameCookie);
  }

  public login(login: LoginModel) {
    const endpoint = this.url + '/auth/user/login';
    const headers = {'accept': 'application/json', 'Content-Type': 'application/json'};
    let newToken;

    return this.httpClient.post<TokenModel>(endpoint, login, {headers: headers, responseType: 'text' as 'json'})
      .pipe(
        catchError(this.globalErrorHandler.handleError)
      )
      .subscribe(token => {
        newToken = String(token);
        this.setAuthenticationToken(newToken)
        this.setUsernameCookie(login.username ?? ''); // Ustaw pusty string, jeśli login.username jest null lub undefined
        this.router.navigate(['/'])
      })

  }

  public signup(register: RegisterModel): void {
    const endpoint = this.url + '/auth/user/register';
    let newToken;
    const headers = {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    };
    // const corsHeaders = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Accept': 'application/json',
    //   'Access-Control-Allow-Origin': 'http://localhost:19727'
    // });
    console.log(endpoint)
    this.httpClient.post<TokenModel>(endpoint, register, {headers: headers, responseType: 'text' as 'json'})
      .pipe(
        catchError(this.globalErrorHandler.handleError)
      )
      .subscribe(token => {
          newToken = String(token);
          this.setAuthenticationToken(newToken)
          console.log(token)
          this.setUsernameCookie(register.username ?? ''); // Ustaw pusty string, jeśli login.username jest null lub undefined
          this.router.navigate(['/'])
        }
      )
  }

  public isUserLoggedIn(): Boolean {
    return this.cookieService.check(this.authenticationTokenCookieName);//check if token expired
  }

  public logout(): void {
    // const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.getAccessToken()}` };
    // this.httpClient.post(this.url + '/Logout', { headers: headers }).subscribe();
    this.cookieService.deleteAll();
    this.router.navigate(['/login']);
  }

  public getUserRole(): string {
    const headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${this.getAccessToken()}`};
    let userRole = '';
    this.httpClient.get<User>(this.url + '/GetLogged', {headers: headers})
      .pipe(
        catchError(this.globalErrorHandler.handleError)
      )
      .subscribe(user => userRole = user.role)
    return userRole;
  }

  public getLoggedUser() {
    const headers = {'accept': 'text/plain', 'Authorization': `Bearer ${this.getAccessToken()}`};
    return this.httpClient.get<User>(this.url + '/GetLogged', {headers: headers})
      .pipe(
        catchError(this.globalErrorHandler.handleError)
      )
  }

  public changePassword(oldPassword: string, newPassword: string) {
    const headers = {
      'accept': '*/*',
      'Authorization': `Bearer ${this.getAccessToken()}`,
      'Content-Type': 'application/json'
    };
    const endpoint = this.url + '/ChangePassword'
    return this.httpClient.post(endpoint, {oldPassword: oldPassword, newPassword: newPassword}, {headers: headers})
      .pipe(
        catchError(this.globalErrorHandler.handleError)
      )
  }

  public updateUser(user: any) {
    const headers = {
      'accept': '*/*',
      'Authorization': `Bearer ${this.getAccessToken()}`,
      'Content-Type': 'application/json'
    };
    const endpoint = this.url + '/UpdateUser'
    return this.httpClient.post(endpoint, user, {headers: headers}).pipe(
      catchError(this.globalErrorHandler.handleError)
    )
  }
}
