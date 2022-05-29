import { TestBed } from '@angular/core/testing';

import { SurveyResolver } from './survey.resolver';

describe('SurveyResolver', () => {
  let resolver: SurveyResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SurveyResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
