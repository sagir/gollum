import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakenSurveyComponent } from './taken-survey.component';

describe('TakenSurveyComponent', () => {
  let component: TakenSurveyComponent;
  let fixture: ComponentFixture<TakenSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakenSurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TakenSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
