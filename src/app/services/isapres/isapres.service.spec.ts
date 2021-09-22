import { TestBed } from '@angular/core/testing';

import { IsapresService } from './isapres.service';

describe('IsapresService', () => {
  let service: IsapresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsapresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
