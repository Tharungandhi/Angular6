import { TestBed } from '@angular/core/testing';

import { KeepHelperService } from './keep-helper.service';

describe('KeepHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KeepHelperService = TestBed.get(KeepHelperService);
    expect(service).toBeTruthy();
  });
});
