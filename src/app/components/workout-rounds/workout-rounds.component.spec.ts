import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutRoundsComponent } from './workout-rounds.component';

describe('WorkoutRoundsComponent', () => {
  let component: WorkoutRoundsComponent;
  let fixture: ComponentFixture<WorkoutRoundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutRoundsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutRoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
