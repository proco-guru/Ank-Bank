import { Routes } from '@angular/router';
import { Customers } from './components/customers/customers';
import { Login } from './components/login/login';
import { TransactionHistory } from './components/transaction-history/transaction-history';
import { FundTransfer } from './components/fund-transfer/fund-transfer';
import { AccountBalanceWidget } from './components/account-balance-widget/account-balance-widget';
import { AccountCards } from './components/account-cards/account-cards';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'customer', component: Customers, canActivate: [authGuard] },
  { path: 'transaction', component: TransactionHistory, canActivate: [authGuard] },
  { path: 'fund-transfer', component: FundTransfer, canActivate: [authGuard] },
  { path: 'account-balance-widget', component: AccountBalanceWidget, canActivate: [authGuard] },
  { path: 'account-cards', component: AccountCards, canActivate: [authGuard] },
  { path: '**', redirectTo: '/login' },
];
