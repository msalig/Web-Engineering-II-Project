import { TestBed } from '@angular/core/testing';

import { GetblogsService } from './getblogs.service';

describe('GetblogsService', () => {
  let service: GetblogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetblogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
