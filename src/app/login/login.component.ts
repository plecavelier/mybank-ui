import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FormErrorComponent } from '../form-error/form-error.component';
import { SecurityService } from '../security.service';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  directives: [ REACTIVE_FORM_DIRECTIVES, FormErrorComponent ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  usernameControl: FormControl;
  passwordControl: FormControl;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private securityService: SecurityService, private router: Router) { }

  ngOnInit() {

    this.usernameControl = this.formBuilder.control('', [ Validators.required, Validators.maxLength(200) ]);
    this.passwordControl = this.formBuilder.control('', [ Validators.required, Validators.maxLength(200) ]);
    this.loginForm = this.formBuilder.group({
      username: this.usernameControl,
      password: this.passwordControl
    });

  }

  login() {
    console.log(this.usernameControl.value);
    console.log(this.passwordControl.value);
    this.securityService.login(this.usernameControl.value, this.passwordControl.value).subscribe(
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
