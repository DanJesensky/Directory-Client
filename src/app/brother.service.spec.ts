import { TestBed } from '@angular/core/testing';

import { BrotherService } from './brother.service';

describe('BrotherServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BrotherService = TestBed.get(BrotherService);
    expect(service).toBeTruthy();
  });
});
