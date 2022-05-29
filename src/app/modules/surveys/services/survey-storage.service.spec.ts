import { TestBed } from '@angular/core/testing';

import { SurveyStorageService } from './survey-storage.service';

describe('SurveyStorageService', () => {
  let service: SurveyStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
