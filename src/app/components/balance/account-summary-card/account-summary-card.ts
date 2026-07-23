import { booleanAttribute, Component, EventEmitter, Input, Output } from '@angular/core';
import { AmountTxns, BankAccount } from '../../accountCards/account-cards/account-cards';
import { CommonModule } from '@angular/common';
import { MaskedAccountPipe } from '../../../pipes/masked-account-pipe-pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-summary-card',
  imports: [CommonModule, MaskedAccountPipe],
  templateUrl: './account-summary-card.html',
  styleUrl: './account-summary-card.css',
})
export class AccountSummaryCard {
  @Input({ required: true }) currentAccount!: BankAccount;
  @Input({ required: true }) transactionsHistoryList!: AmountTxns[];
  @Input({ transform: booleanAttribute }) isSelected!: boolean;
  @Input() moduleTitle: string = 'Transactions';

  @Output() cardSelected = new EventEmitter<BankAccount>();
  @Output() transactionClicked = new EventEmitter<AmountTxns>();

  constructor(private route: Router) {}
  onCardSelect(selectedTxn: BankAccount) {
    // this.isSelected = true;
    this.cardSelected.emit(selectedTxn);
  }

  onTransactionClicked(selectedTxn: AmountTxns) {
    this.transactionClicked.emit(selectedTxn);
  }

  // Add this method to the class
  trackByTxn(index: number, txn: AmountTxns): number {
    return txn.txnId;
  }
}
