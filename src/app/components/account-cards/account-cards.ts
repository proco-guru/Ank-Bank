import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// This interface defines the shape of our account data
// Exactly like a DTO in your .NET backend
interface BankAccount {
  accountNumber: string;
  holderName: string;
  balance: number;
  accountType: 'Savings' | 'Current' | 'Salary';
  ifscCode: string;
  isActive: boolean;
  lastUpdated: Date;
}

interface AmountTxns {
  txnId: number;
  senderAccNumber: string;
  beneAccNumber: string;
  beneName: string;
  amount: number;
  ifscCode: string;
  txnDate: Date;
}

@Component({
  selector: 'app-account-cards',
  imports: [CommonModule],
  templateUrl: './account-cards.html',
  styleUrl: './account-cards.css',
})
export class AccountCards {
  // This is the data our template will display
  // In a real app this would come from an API via a Service
  account: BankAccount = {
    accountNumber: 'SB-9876543210',
    holderName: 'Ankita Pawar',
    balance: 425750.5,
    accountType: 'Savings',
    ifscCode: 'HDFC0001234',
    isActive: true,
    lastUpdated: new Date(),
  };

  //creating array of the RecentTxns
  recentTransactions: AmountTxns[] = [
    {
      txnId: 1,
      senderAccNumber: '98765432123',
      beneAccNumber: '34567898765',
      beneName: 'ParsuRam',
      amount: 500,
      ifscCode: 'HDFC0001234',
      txnDate: new Date(),
    },
    {
      txnId: 2,
      senderAccNumber: '98765453123',
      beneAccNumber: '34567898752',
      beneName: 'anki',
      amount: 590,
      ifscCode: 'HDFC0001234',
      txnDate: new Date(),
    },
    {
      txnId: 3,
      senderAccNumber: '98752332123',
      beneAccNumber: '3456498765',
      beneName: 'Kailu',
      amount: 890,
      ifscCode: 'HDFC0001234',
      txnDate: new Date(),
    },
  ];
  //to return the count of totl recent txns
  get transactionCount(): number {
    return this.recentTransactions.length;
  }
  // This property controls whether balance is visible or hidden
  // Like the "show/hide balance" button in mobile banking apps
  isBalanceVisible: boolean = true;

  // Method — toggles balance visibility
  // The template will call this when user clicks the eye icon
  toggleBalanceVisibility(): void {
    this.isBalanceVisible = !this.isBalanceVisible;
  }

  // Method — formats account number for display
  // "SB-9876543210" → "SB-98765 XXXXX" (masked for security)
  getMaskedAccountNumber(): string {
    const accNo = this.account.accountNumber;
    return accNo.substring(0, 8) + ' XXXXX';
  }

  // Method — returns CSS class based on account status
  // We use this in the template to show green/red status badge
  getStatusClass(): string {
    return this.account.isActive ? 'status-active' : 'status-inactive';
  }

  //return formatted balance
  FormattedBalance(): string {
    return this.account.balance.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}
