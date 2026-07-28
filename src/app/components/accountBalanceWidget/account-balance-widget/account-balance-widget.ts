import {
  Component,
  computed,
  effect,
  Input,
  input,
  OnChanges,
  OnDestroy,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-account-balance-widget',
  imports: [],
  templateUrl: './account-balance-widget.html',
  styleUrl: './account-balance-widget.css',
})
export class AccountBalanceWidget implements OnInit, OnChanges, OnDestroy {
  constructor() {
    effect(() => {
      // Runs whenever balance changes
      console.log('Balance changed to:', this.balance());
      // Auto-cleanup on component destroy — no unsubscribe needed
    });
  }
  // @Input()
  // balance: number = 20;

  balance = signal<number>(45630);
  private pollingInterval: any;
  balanceAfterTax = computed(() => this.balance() * 0.97);

  ngOnInit(): void {
    //setting interval of 5sec
    // this.pollingInterval = setInterval(() => {}, 5000);
  }

  deposit(amount: number): void {
    // update() — modify based on current value
    this.balance.update((current) => current + amount);
  }

  withdraw(amount: number): void {
    // set() — set a new value directly
    this.balance.set(this.balance() - amount);
  }

  ngOnChanges(changes: SimpleChanges): void {
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
    }
  }
  triggerDebitAnimation(): void {
    console.log('Balance decreased — show red flash animation');
  }
}
