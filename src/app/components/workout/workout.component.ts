import {Component, OnDestroy, OnInit} from '@angular/core';
import {WodConfigService} from '../../services/wod-config.service';
import {TimerService} from '../../services/timer.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit, OnDestroy {

  formValues = null;
  wodName = '';
  randomReps = '';
  timer = null;

  constructor(
    private wodConfigService: WodConfigService
  ) {
    this.formValues = wodConfigService.formValues;
  }

  ngOnInit() {
    this.startTime();
    this.generateRandomWOD()
  }

  ngOnDestroy() {
    this.timer.clear();
  }

  get time() {
    return this.timer.time;
  }

  startTime() {
    this.timer = new TimerService(3);
    this.timer.start();
  }

  generateRandomWOD() {
    const {name, reps} = this.wodConfigService.generateRandomWOD();
    this.wodName = name;
    this.randomReps = reps.toString();
  }
}
