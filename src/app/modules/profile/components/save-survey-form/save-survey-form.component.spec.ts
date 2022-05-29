import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveSurveyFormComponent } from './save-survey-form.component';

describe('SaveSurveyFormComponent', () => {
  let component: SaveSurveyFormComponent;
  let fixture: ComponentFixture<SaveSurveyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveSurveyFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveSurveyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
