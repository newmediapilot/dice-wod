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
  isCountdown = true;
  paused = true;

  constructor(
    private wodConfigService: WodConfigService
  ) {
    this.formValues = wodConfigService.formValues;
  }

  ngOnInit() {
    this.prepareCountdown();
    this.generateRandomWOD()
  }

  ngOnDestroy() {
    this.timer.stop();
  }

  get time() {
    const {countdown, stopwatch} = this.timer.time;
    return (this.isCountdown) ? countdown : stopwatch;
  }

  toggleTimer() {
    (this.paused) ? this.timer.start() : this.timer.stop();
    this.paused = !this.paused;
  }

  prepareCountdown() {
    this.timer = new TimerService(10);
    this.isCountdown = true;
    this.timer.done(() => {
      this.isCountdown = false;
      this.startTime();
    });
  }

  startTime() {
    const time = this.wodConfigService.formValues.wodParams.wodTime || 5;
    this.timer = new TimerService(time);
    this.timer.start();
    this.timer.done(() => {
      console.log('all done!');
    })
  }

  generateRandomWOD() {
    const {name, reps} = this.wodConfigService.generateRandomWOD();
    this.wodName = name;
    this.randomReps = reps.toString();
  }
}
