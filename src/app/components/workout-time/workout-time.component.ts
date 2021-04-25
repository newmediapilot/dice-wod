import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TimerComponent} from '../common/timer/timer.component';
import {WodConfigService} from '../../services/wod-config.service';
import {ConfettiService} from '../../services/confetti.service';
import {WorkoutComponent} from '../workout/workout.component';

@Component({
  selector: 'app-workout-time',
  templateUrl: './workout-time.component.html',
  styleUrls: ['./workout-time.component.scss']
})
export class WorkoutTimeComponent extends WorkoutComponent implements OnInit {

  @ViewChild(TimerComponent, {static: true}) appTimer: TimerComponent;
  @ViewChild('confetti', {static: true}) confettiRef: ElementRef;

  constructor(
    wodConfigService: WodConfigService
  ) {
    super(wodConfigService);
  }

  prepareMovements() {
    this.wodConfigService.generateRandomWODs(900);
  }

  determineWodDuration() {
    const {wodTime} = this.wodConfigService.formValues.wodParams;

    return wodTime
  }

}
