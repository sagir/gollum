import { TestBed } from '@angular/core/testing';

import { NextQustionGuard } from './next-qustion.guard';

describe('NextQustionGuard', () => {
  let guard: NextQustionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NextQustionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
