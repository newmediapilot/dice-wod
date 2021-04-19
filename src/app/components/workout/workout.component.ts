import {Component, OnDestroy, OnInit} from '@angular/core';
import {WodConfigService} from '../../services/wod-config.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit, OnDestroy {

  formValues = null;
  wodName = '';
  randomReps = '';

  constructor(
    private wodConfigService: WodConfigService
  ) {
    this.formValues = wodConfigService.formValues;
  }

  ngOnInit() {
    this.generateRandomWOD()
  }

  ngOnDestroy() {
    //
  }

  generateRandomWOD() {
    const {name, reps} = this.wodConfigService.generateRandomWOD();
    this.wodName = name;
    this.randomReps = reps.toString();
  }
}
