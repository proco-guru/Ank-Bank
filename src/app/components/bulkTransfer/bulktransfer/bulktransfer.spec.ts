import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bulktransfer } from './bulktransfer';

describe('Bulktransfer', () => {
  let component: Bulktransfer;
  let fixture: ComponentFixture<Bulktransfer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bulktransfer],
    }).compileComponents();

    fixture = TestBed.createComponent(Bulktransfer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
