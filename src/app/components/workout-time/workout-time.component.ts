import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {WodConfigService} from '../../services/wod-config.service';
import {WorkoutComponent} from '../workout/workout.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-workout-time',
  templateUrl: './workout-time.component.html',
  styleUrls: ['./workout-time.component.scss']
})
export class WorkoutTimeComponent extends WorkoutComponent implements OnInit {

  constructor(
    wodConfigService: WodConfigService,
    router: Router
  ) {
    super(wodConfigService, router);
  }

  prepareMovements() {
    this.wodConfigService.generateRandomWODs(900);
  }

  determineWodDuration() {
    const {wodTime} = this.wodConfigService.formValues.wodParams;

    return wodTime
  }

}
