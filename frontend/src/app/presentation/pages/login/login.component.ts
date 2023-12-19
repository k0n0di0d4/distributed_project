import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/domain/services/auth.service';
import { UserService } from 'src/app/domain/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isRegisterFormActive: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/'])
    }
  }

  ngOnInit(): void {

  }

  changeForm(): void {
    this.isRegisterFormActive = !this.isRegisterFormActive;
  }

}
