import {
  Component,
  Input,
  input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-account-balance-widget',
  imports: [],
  templateUrl: './account-balance-widget.html',
  styleUrl: './account-balance-widget.css',
})
export class AccountBalanceWidget implements OnInit, OnChanges, OnDestroy {
  constructor() {}
  @Input()
  balance: number = 20;
  private pollingInterval: any;

  ngOnInit(): void {
    //setting interval of 5sec
    this.pollingInterval = setInterval(() => {
      console.log('checking for updates...');
    }, 5000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges fired:', changes);

    if (changes['balance']) {
      console.log(changes['balance'].currentValue + 'Curr val');
      console.log(changes['balance'].firstChange + 'first val');
      console.log(changes['balance'].previousValue + 'prev val');
      // ONLY if it's not the first load, and balance actually decreased
      if (
        !changes['balance'].firstChange &&
        changes['balance'].currentValue < changes['balance'].previousValue
      ) {
        this.triggerDebitAnimation();
      }
    }
  }
  //destroy intravals
  ngOnDestroy(): void {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      console.log('Removed interval...........');
    }
  }
  triggerDebitAnimation(): void {
    console.log('Balance decreased — show red flash animation');
  }
}
