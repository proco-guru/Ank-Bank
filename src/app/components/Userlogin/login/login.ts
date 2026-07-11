import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  userName: string = '';
  password: string = '';
  loginError: string = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute, // ← read query params from here
  ) {}
  onLogin(): void {
    //login if credential matches, set cred on locl storage
    if (this.userName === 'Admin' && this.password === 'Admin@123') {
      localStorage.setItem('isCustLogin', 'true');

      // Read returnUrl — fall back to 'customer' if not present
      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || 'dashboard';
      this.router.navigateByUrl(returnUrl);
      console.log('success to login');
    } else {
      console.log('failed to login');
      this.loginError = 'Invalid username or password. Please try again.';
    }
  }
}
