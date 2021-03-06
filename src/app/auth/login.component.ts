import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  usernameControl: FormControl;
  passwordControl: FormControl;
  rememberMeControl: FormControl;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {

    this.usernameControl = this.formBuilder.control('', [ Validators.required, Validators.maxLength(200) ]);
    this.passwordControl = this.formBuilder.control('', [ Validators.required, Validators.maxLength(200) ]);
    this.rememberMeControl = this.formBuilder.control(true);
    this.loginForm = this.formBuilder.group({
      username: this.usernameControl,
      password: this.passwordControl,
      rememberMe: this.rememberMeControl
    });

  }

  login() {
    this.authService.login(this.usernameControl.value, this.passwordControl.value, this.rememberMeControl.value).subscribe(
      response => {
        console.log("Redirect to home");
        this.router.navigate(['operations']);
      },
      errorCode => {
        this.errorMessage = errorCode == 'unauthorized' ? 'Login ou mot de passe incorrect' : 'Une erreur inattendue s\'est produite';
      }
    );
  }

}
