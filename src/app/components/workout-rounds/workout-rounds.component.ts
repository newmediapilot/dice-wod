import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TimerComponent} from '../common/timer/timer.component';
import {WodConfigService} from '../../services/wod-config.service';
import {ConfettiService} from '../../services/confetti.service';
import {WorkoutComponent} from '../workout/workout.component';

@Component({
  selector: 'app-workout-rounds',
  templateUrl: './workout-rounds.component.html',
  styleUrls: ['./workout-rounds.component.scss']
})
export class WorkoutRoundsComponent extends WorkoutComponent implements OnInit {

  @ViewChild(TimerComponent, {static: true}) appTimer: TimerComponent;
  @ViewChild('confetti', {static: true}) confettiRef: ElementRef;

  constructor(
    wodConfigService: WodConfigService
  ) {
    super(wodConfigService);
  }

  prepareMovements() {
    const {wodSets} = this.wodConfigService.formValues.wodParams;

    this.wodConfigService.generateRandomWODs(wodSets);
  }

  get wodPercent() {
    const {wodPercentDone} = this.formValues.userData;

    return Math.round(wodPercentDone * 100);
  }

}
