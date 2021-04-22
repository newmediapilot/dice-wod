import {Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {WodConfigService} from '../../services/wod-config.service';
import {TimerService} from '../../services/timer.service';
import {ConfettiService} from '../../services/confetti.service';

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
  wodComplete = false;
  paused = true;
  wodType = '';

  @ViewChild('confetti', {static: true}) confettiRef: ElementRef;

  constructor(
    private wodConfigService: WodConfigService
  ) {
    this.formValues = wodConfigService.formValues;
    this.wodType = wodConfigService.formValues.wodParams.wodType;
  }

  ngOnInit() {
    this.wodConfigService.resetSets();
    this.prepareCountdown();
    this.generateRandomWOD();
    this.celebrate();
  }

  ngOnDestroy() {
    this.timer.stop();
  }

  celebrate() {
    const confetti = new ConfettiService(this.confettiRef.nativeElement);
    confetti.celebrate();
  }

  get wodPercent() {
    const {wodType} = this.formValues.wodParams;
    const {wodPercentDone} = this.formValues.userData;

    let percent = 0;

    if ('time' == wodType && !this.isCountdown)
      percent = Math.round(this.timer.percent * 100);

    if ('rounds' == wodType)
      percent = Math.round(wodPercentDone * 100);

    console.log('this.timer.percent', this.timer.percent);
    console.log('wodPercentDone', wodPercentDone);

    return percent;
  }

  get time() {
    const {countdown, stopwatch} = this.timer.time;
    return (this.isCountdown) ? countdown : stopwatch;
  }

  get sets() {
    const {wodSetsDone} = this.wodConfigService.formValues.userData;

    return wodSetsDone.length;
  }

  get todo() {
    const {wodSetsDone} = this.wodConfigService.formValues.userData;
    const {wodSets} = this.wodConfigService.formValues.wodParams;
    return wodSets - wodSetsDone.length + 1;
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
    const {wodTime, wodType} = this.wodConfigService.formValues.wodParams;
    const time = (wodType === 'time') ? wodTime : 3600;
    this.timer = new TimerService(time);
    this.timer.start();
    this.timer.done(() => {
      this.workoutComplete();
    })
  }

  wodRoundsRemain() {
    const {wodType} = this.wodConfigService.formValues.wodParams;

    if (wodType === 'rounds' && this.todo === 0) {
      this.workoutComplete();
      return false
    }

    return true;
  }

  workoutComplete() {
    this.wodComplete = true;
    this.timer.stop();
    window.alert('wod complete');
  }

  generateRandomWOD() {
    if (this.wodRoundsRemain()) {
      const {name, reps} = this.wodConfigService.generateRandomWOD();
      this.wodName = name;
      this.randomReps = reps.toString();
    }
  }

}
