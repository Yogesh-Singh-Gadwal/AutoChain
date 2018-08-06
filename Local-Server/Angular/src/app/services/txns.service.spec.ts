import { TestBed, inject } from '@angular/core/testing';

import { TxnsService } from './txns.service';

describe('TxnsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TxnsService]
    });
  });

  it('should be created', inject([TxnsService], (service: TxnsService) => {
    expect(service).toBeTruthy();
  }));
});
