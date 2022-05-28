import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakenSurveysComponent } from './taken-surveys.component';

describe('TakenSurveysComponent', () => {
  let component: TakenSurveysComponent;
  let fixture: ComponentFixture<TakenSurveysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakenSurveysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TakenSurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
