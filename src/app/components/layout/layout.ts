import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterLink],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  constructor(private router: Router) {}
  //method to logout the user by clearing the credentials
  logout() {
    localStorage.removeItem('isCustLogin');
    console.log('remogeed');
    this.router.navigateByUrl('login');
  }
}
