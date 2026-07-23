import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiarySearch } from './beneficiary-search';

describe('BeneficiarySearch', () => {
  let component: BeneficiarySearch;
  let fixture: ComponentFixture<BeneficiarySearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeneficiarySearch],
    }).compileComponents();

    fixture = TestBed.createComponent(BeneficiarySearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
