import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingSurveyConfirmationComponent } from './pending-survey-confirmation.component';

describe('PendingSurveyConfirmationComponent', () => {
  let component: PendingSurveyConfirmationComponent;
  let fixture: ComponentFixture<PendingSurveyConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingSurveyConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingSurveyConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
