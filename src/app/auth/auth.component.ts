import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  constructor(private authService: AuthService, private router: Router) {}
  isLoginMode = true;
  hideSpinner = true;
  error: string = null;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onHandleError() {
    this.error = null;
  }

  onSubmit(form: NgForm) {
    this.authService.spotifyAPI();
    const email = form.value.email;
    const password = form.value.password;
    this.hideSpinner = false;
    if (!form.valid) {
      return;
    }

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.logIn(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(
      (data) => {
        this.hideSpinner = true;
        console.log(data);
        console.log(
          `Successfully ${this.isLoginMode ? 'logged in' : 'registered'} user ${
            data.email
          }`
        );
        this.router.navigate(['/recipes']);
      },
      (errorMessage) => {
        this.hideSpinner = true;
        this.error = errorMessage;
      }
    );
    form.reset();
  }
}
