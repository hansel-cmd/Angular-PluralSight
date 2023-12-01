import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  styles: [
    `
    em { float: right; color: #E05C65; padding-left: 10px;}
    `
  ]
})
export class LoginComponent {
  userName: string = '';
  password: string = '';
  isHoveringLoginButton : boolean = false;
  loginInvalid : boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  handlLogin(form: NgForm) {
    const { userName, password } = form.value;
    this.authService.loginUser(userName, password).subscribe(response => {
      if (response === false) {
        this.loginInvalid = true;
      } else {
        this.router.navigate(['/events'])
        this.loginInvalid = true;
      }
    });
  }

  cancel() {
    this.router.navigate(['/events'])
  }
}
