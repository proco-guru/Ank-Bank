import { TestBed } from '@angular/core/testing';

import { TransferNotificationService } from './transfer-notification-service';

describe('TransferNotificationService', () => {
  let service: TransferNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
