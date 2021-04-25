import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {WodConfigService} from '../../services/wod-config.service';
import {WorkoutComponent} from '../workout/workout.component';

@Component({
  selector: 'app-workout-rounds',
  templateUrl: './workout-rounds.component.html',
  styleUrls: ['./workout-rounds.component.scss']
})
export class WorkoutRoundsComponent extends WorkoutComponent implements OnInit {

  constructor(
    wodConfigService: WodConfigService
  ) {
    super(wodConfigService);
  }

  determineWodDuration() {
    return 9000;
  }

  wodRoundsRemain() {
    return this.wodSetsLeft > 0
  }

  get wodPercent() {
    return Math.round(this.formValues.userData.wodPercentDone * 100);
  }

}
