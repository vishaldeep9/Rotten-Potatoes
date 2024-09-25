import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  errorMessage!: string;

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  login() {
    // trim is bcz of removing spaces
    if (this.username.trim().length === 0) {
      this.errorMessage = 'username is required';
      this.errorMsgTimer();
    } else if (this.password.trim().length === 0) {
      this.errorMessage = 'password is required';
      this.errorMsgTimer();
    } else {
      this.errorMessage = '';
      
      const res = this.authService.login(this.username, this.password);
      if (res === 200) {
        this.router.navigate(['home']);
      } else if (res === 403) {
        this.errorMessage = 'Invalid Credentials';
        this.errorMsgTimer();
      }
    }
  }
  errorMsgTimer() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
