import { TestBed } from '@angular/core/testing';

import { SshopGuard } from './sshop.guard';

describe('SshopGuard', () => {
  let guard: SshopGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SshopGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
