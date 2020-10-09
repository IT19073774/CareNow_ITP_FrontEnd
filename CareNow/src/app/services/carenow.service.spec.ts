import { TestBed } from '@angular/core/testing';

import { CarenowService } from './carenow.service';

describe('CarenowService', () => {
  let service: CarenowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarenowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
