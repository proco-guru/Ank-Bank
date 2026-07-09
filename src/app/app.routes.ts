import { Routes } from '@angular/router';
// import { Customers } from './components/customers/customers';
// import { Login } from './components/Userlogin/login/login';
// import { TransactionHistory } from './components/transaction-history/transaction-history';
// import { FundTransfer } from './components/fund-transfer/fund-transfer';
// import { AccountBalanceWidget } from './components/accountBalanceWidget/account-balance-widget/account-balance-widget';
// import { AccountCards } from './components/account-cards/account-cards';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: 'login', component: Login },
  // { path: 'customer', component: Customers, canActivate: [authGuard] },
  // { path: 'transaction', component: TransactionHistory, canActivate: [authGuard] },
  // { path: 'fund-transfer', component: FundTransfer, canActivate: [authGuard] },
  // { path: 'account-balance-widget', component: AccountBalanceWidget, canActivate: [authGuard] },
  // { path: 'account-cards', component: AccountCards, canActivate: [authGuard] },
  // { path: '**', redirectTo: '/login' },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  //lazy loading the component only on the request for the route
  {
    path: 'login',
    loadComponent: () => import('./components/Userlogin/login/login').then((c) => c.Login),
  },
  {
    path: 'customer',
    loadComponent: () => import('./components/Userlogin/login/login').then((c) => c.Login),
  },
  {
    path: 'transaction',
    loadComponent: () =>
      import('./components/transactionHistory/transaction-history/transaction-history').then(
        (c) => c.TransactionHistory,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'fund-transfer',
    loadComponent: () =>
      import('./components/fundTransfer/fund-transfer/fund-transfer').then((c) => c.FundTransfer),
    canActivate: [authGuard],
  },
  {
    path: 'account-balance-widget',
    loadComponent: () =>
      import('./components/accountBalanceWidget/account-balance-widget/account-balance-widget').then(
        (c) => c.AccountBalanceWidget,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'account-cards',
    loadComponent: () =>
      import('./components/accountCards/account-cards/account-cards').then((c) => c.AccountCards),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '/login' },
];
