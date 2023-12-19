import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/domain/services/user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  registerForm = new FormGroup({
    password: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required)
  })

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  submitRegister() {
    this.userService.signup(
      {
        username: this.registerForm.get('username')?.value,
        password: this.registerForm.get('password')?.value
      }
    )
    this.registerForm.reset()
  }

  get username() {
    return this.registerForm.get('username')
  }

  get password() {
    return this.registerForm.get('password')
  }


}
