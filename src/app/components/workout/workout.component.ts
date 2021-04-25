import {Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {WodConfigService} from '../../services/wod-config.service';
import {ConfettiService} from '../../services/confetti.service';
import {TimerComponent} from '../common/timer/timer.component';

export class WorkoutComponent implements OnInit {

  formValues = null;
  wodName = '';
  wodNameUpcoming = '';
  randomReps = '';
  timer = null;
  isCountdown = true;
  wodComplete = false;
  paused = true;
  wodType = '';
  wodConfigService;

  @ViewChild(TimerComponent, {static: true}) appTimer: TimerComponent;
  @ViewChild('confetti', {static: true}) confettiRef: ElementRef;

  constructor(
    wodConfigService: WodConfigService
  ) {
    this.wodConfigService = wodConfigService;
    this.formValues = wodConfigService.formValues;
    this.wodType = wodConfigService.formValues.wodParams.wodType;
  }

  ngOnInit() {
    this.wodConfigService.resetSets();
    this.prepareMovements();
    this.fetchNextMovement();
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

  get wodSetsDone() {
    return this.wodConfigService.formValues.userData.wodSetsDone.length;
  }

  get wodSetsLeft() {
    return this.wodConfigService.formValues.wodTypeMovementPool.length;
  }

  prepareMovements() {
    const {wodType} = this.wodConfigService.formValues.wodParams;
    const {wodSets} = this.wodConfigService.formValues.wodParams;
    if (wodType === 'time') {
      this.wodConfigService.generateRandomWODs(900);
    } else {
      this.wodConfigService.generateRandomWODs(wodSets);
    }
  }

  determineWodDuration() {
    const {wodTime, wodType} = this.wodConfigService.formValues.wodParams;
    return (wodType === 'time') ? wodTime : 9000;
  }

  wodRoundsRemain() {
    if (this.wodSetsLeft === 0) {
      this.workoutComplete();
      return false;
    }
    return true;
  }

  timerStateCompleted() {
    this.workoutComplete();
  }

  workoutComplete() {
    this.wodComplete = true;
    this.appTimer.start(); // pauses
    this.celebrate();
  }

  fetchNextMovement() {
    if (this.wodRoundsRemain()) {
      const {current, upcoming} = this.wodConfigService.fetchNextMovement();
      this.wodName = current.name;
      if(upcoming) this.wodNameUpcoming = upcoming.name;
      this.randomReps = current.reps.toString();
    }
  }

}
