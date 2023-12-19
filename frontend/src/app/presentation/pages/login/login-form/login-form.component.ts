import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/domain/services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  submitLogin() {
    const username = this.loginForm.get('username')?.value as string ?? '';
    const password = this.loginForm.get('password')?.value as string ?? '';

    this.userService.login({ username, password });
    // this.userService.login(
    //   {
    //     username: this.loginForm.get('username')?.value as string,
    //     password: this.loginForm.get('password')?.value as string
    //   }
    // )
    this.loginForm.reset()
  }

  get username() {
    return this.loginForm.get('username')
  }

  get password() {
    return this.loginForm.get('password')
  }
}
