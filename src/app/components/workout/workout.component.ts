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
  wodNameUpcoming = '';
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
    this.prepareMovements();
    this.prepareCountdown();
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

    if ('time' == wodType && !this.isCountdown) percent = Math.round(this.timer.percent * 100);
    if ('rounds' == wodType) percent = Math.round(wodPercentDone * 100);

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
    const {wodTypeMovementPool} = this.wodConfigService.formValues;
    return wodTypeMovementPool.length;
  }

  toggleTimer() {
    (this.paused) ? this.timer.start() : this.timer.stop();
    this.paused = !this.paused;
  }

  prepareMovements() {
    const {wodType} = this.wodConfigService.formValues.wodParams;
    const {wodSets} = this.wodConfigService.formValues.wodParams;
    if (wodType === 'time') {
      this.wodConfigService.generateRandomWODs(300);
    } else {
      this.wodConfigService.generateRandomWODs(wodSets);
    }
    this.fetchNextMovement();
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
    this.celebrate();
  }

  fetchNextMovement() {
    if (this.wodRoundsRemain()) {
      const {current, upcoming} = this.wodConfigService.fetchNextMovement();
      this.wodName = current.name;
      this.wodNameUpcoming = upcoming.name;
      this.randomReps = current.reps.toString();
    }
  }

}
