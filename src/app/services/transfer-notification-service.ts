import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransferNotificationService {
  //creating behavioural Subject with default initial val
  private balanceSource = new BehaviorSubject<number>(0);
  // Components subscribe to this to react to EVERY change, including the current value immediately
  balance$: Observable<number> = this.balanceSource.asObservable();

  //getter method to get Currnt balance status
  getCurrentBalance(): number {
    return this.balanceSource.value;
  }
  //setter method to set Currnt balance status
  setCurrentBalance(newBalance: number): void {
    this.balanceSource.next(newBalance);
  }

  //created sample object having  subject type with amount and toacc fields
  private transferCompletedSource = new Subject<{ amount: number; toAccount: string }>();
  // public — Observable so components can only SUBSCRIBE, never push
  transferCompleted$ = this.transferCompletedSource.asObservable();

  //method to set the val to the observable
  notifyTransferCompleted(amount: number, toAccount: string): void {
    this.transferCompletedSource.next({ amount, toAccount });
    console.log('setting..', amount, toAccount);
  }
}
