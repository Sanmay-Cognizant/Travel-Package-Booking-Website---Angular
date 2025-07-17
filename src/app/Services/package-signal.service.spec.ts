import { TestBed } from '@angular/core/testing';

import { PackageSignalService } from './package-signal.service';

describe('PackageSignalService', () => {
  let service: PackageSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackageSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
