import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {WodConfigService} from '../../services/wod-config.service';
import {WorkoutComponent} from '../workout/workout.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-workout-rounds',
  templateUrl: './workout-rounds.component.html',
  styleUrls: ['./workout-rounds.component.scss']
})
export class WorkoutRoundsComponent extends WorkoutComponent {

  constructor(
    wodConfigService: WodConfigService,
    router: Router
  ) {
    super(wodConfigService, router);
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
