import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuesitonComponent } from './quesiton.component';

describe('QuesitonComponent', () => {
  let component: QuesitonComponent;
  let fixture: ComponentFixture<QuesitonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuesitonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuesitonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
