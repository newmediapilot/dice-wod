import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutTimeComponent } from './workout-time.component';

describe('WorkoutTimeComponent', () => {
  let component: WorkoutTimeComponent;
  let fixture: ComponentFixture<WorkoutTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
