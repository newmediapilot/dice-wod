import {Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {WodConfigService} from '../../services/wod-config.service';
import {ConfettiService} from '../../services/confetti.service';
import {TimerComponent} from '../common/timer/timer.component';
import {Router} from '@angular/router';

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
  router;

  @ViewChild(TimerComponent, {static: true}) appTimer: TimerComponent;
  @ViewChild('confetti', {static: true}) confettiRef: ElementRef;

  constructor(
    wodConfigService: WodConfigService,
    router: Router
  ) {
    this.wodConfigService = wodConfigService;
    this.router = router;
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

  timerStateCompleted() {
    this.workoutComplete();
  }

  // overwritten by descendant
  wodRoundsRemain() {
    return true;
  }

  // overwritten by descendant
  determineWodDuration() {
    return 0;
  }

  // overwritten by descendant
  get wodPercent() {
    return 0;
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
      if (upcoming) this.wodNameUpcoming = upcoming.name;
      this.randomReps = current.reps.toString();
    } else {
      this.workoutComplete();
    }
  }

  exitWorkout() {
    this.wodConfigService.resetWodSelectors();
    this.router.navigate(['start']);
  }

}
