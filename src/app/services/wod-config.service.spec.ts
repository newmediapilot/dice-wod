import { TestBed } from '@angular/core/testing';

import { WodConfigService } from './wod-config.service';

describe('WodConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WodConfigService = TestBed.get(WodConfigService);
    expect(service).toBeTruthy();
  });
});
