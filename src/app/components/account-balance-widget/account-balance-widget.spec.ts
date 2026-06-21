import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountBalanceWidget } from './account-balance-widget';

describe('AccountBalanceWidget', () => {
  let component: AccountBalanceWidget;
  let fixture: ComponentFixture<AccountBalanceWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountBalanceWidget],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountBalanceWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
