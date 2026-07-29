import { Component, NgModule, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Layout } from './components/layouts/layout/layout';
import { Observable } from 'rxjs';
import { Loading } from './core/services/loading/loading';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, RouterOutlet, Layout],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  isLoading$: Observable<boolean>;
  protected readonly title = signal('PracBank');
  constructor(private loadingService: Loading) {
    this.isLoading$ = this.loadingService.isLoading$;
  }

  isTxnHistoryVisible: boolean = true;

  toggleTxnHistoryDetails(): void {
    this.isTxnHistoryVisible = !this.isTxnHistoryVisible;
  }
  get isLoggedIn(): boolean {
    return localStorage.getItem('isCustLogin') === 'true';
  }
}
