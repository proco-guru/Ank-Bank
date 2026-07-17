import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  //------eager loading
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: 'login', component: Login },
  // { path: 'customer', component: Customers, canActivate: [authGuard] },
  // { path: 'transaction', component: TransactionHistory, canActivate: [authGuard] },
  // { path: 'fund-transfer', component: FundTransfer, canActivate: [authGuard] },
  // { path: 'account-balance-widget', component: AccountBalanceWidget, canActivate: [authGuard] },
  // { path: 'account-cards', component: AccountCards, canActivate: [authGuard] },
  // { path: '**', redirectTo: '/login' },

  //-----------Lazy loading routing
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  //lazy loading the component only on the request for the route
  {
    path: 'login',
    loadComponent: () => import('./components/Userlogin/login/login').then((c) => c.Login),
  },
  {
    path: 'customer',
    loadComponent: () =>
      import('./components/customer/customers/customers').then((c) => c.Customers),
    canActivate: [authGuard],
  },
  {
    path: 'transaction/:id',
    loadComponent: () =>
      import('./components/transactionHistory/transaction-history/transaction-history').then(
        (c) => c.TransactionHistory,
      ),
    canActivate: [authGuard],
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
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboards/dashboard/dashboard').then((c) => c.Dashboard),
    canActivate: [authGuard],
    //---Child route
    children: [
      {
        //setting default path eg. dashboard/asf
        path: '',
        loadComponent: () =>
          import('./components/accountCards/account-cards/account-cards').then(
            (c) => c.AccountCards,
          ),
      },
      {
        //setting child path eg. dashboard/account-cards
        path: 'account-cards',
        loadComponent: () =>
          import('./components/accountCards/account-cards/account-cards').then(
            (c) => c.AccountCards,
          ),
      },
      {
        //setting child path eg. dashboard/account-cards
        path: 'account-cards/:id',
        loadComponent: () =>
          import('./components/accountCards/account-cards/account-cards').then(
            (c) => c.AccountCards,
          ),
      },
      {
        //setting child path eg. dashboard/fund-transfer
        path: 'fund-transfer',
        loadComponent: () =>
          import('./components/fundTransfer/fund-transfer/fund-transfer').then(
            (c) => c.FundTransfer,
          ),
      },
    ],
  },
  {
    path: 'reactive-fund-transfer',
    loadComponent: () =>
      import('./components/fundTransferReactive/fund-transfer-reactive').then(
        (c) => c.FundTransferReactive,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'apply-loan',
    loadComponent: () =>
      import('./components/loanApplication/loan-application/loan-application').then(
        (c) => c.LoanApplication,
      ),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '/login' },
];
