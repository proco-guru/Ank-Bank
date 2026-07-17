import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Transaction } from '../../../services/tansactionService/transaction-service';

@Component({
  selector: 'app-balance',
  imports: [],
  templateUrl: './balance.html',
  styleUrl: './balance.css',
})
export class Balance {
  @Input() currentBalance: number | undefined;
  @Input() txnList!: Transaction[];

  // ngOnInit(): void {
  //   console.log('---------------------------curr balance', this.currentBalance);
  //   console.log('---------------------------txnList', this.txnList);
  // }
  @Output() balanceUpdated = new EventEmitter<number>();
  updateBalance(): void {
    //retuning last tn balance
    console.log('---------------------------balanceUpdated', this.balanceUpdated);
    this.balanceUpdated.emit(this.txnList.map((c) => c.balanceAfter).at(-1));
  }
}
