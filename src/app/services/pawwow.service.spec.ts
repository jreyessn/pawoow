import { TestBed } from '@angular/core/testing';

import { PawwowService } from './pawwow.service';

describe('PawwowService', () => {
  let service: PawwowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PawwowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
