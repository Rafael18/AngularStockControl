import { TestBed } from '@angular/core/testing';

import { ProductsDataTransferService } from './products-data-transfer.service';

describe('ProductsDataTransferService', () => {
  let service: ProductsDataTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsDataTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
