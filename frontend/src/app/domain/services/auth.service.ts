import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogin: boolean = false;
  roleAs!: string;

  constructor(private userService: UserService) { }

  login() {
    // this.userService.login();
  }

  logout() {
    this.userService.logout();
  }

  isLoggedIn() {
    return this.userService.isUserLoggedIn();
  }

  getRole() {
    return this.userService.getUserRole();
  }
}
