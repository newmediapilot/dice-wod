import {Component, OnDestroy, OnInit} from '@angular/core';
import {WodConfigService} from '../../services/wod-config.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.scss']
})
export class CustomizeComponent implements OnInit {

  formValues = null;

  constructor(
    private router: Router,
    private wodConfigService: WodConfigService) {
    this.formValues = wodConfigService.formValues;

    this.wodConfigService.generateCheckboxList();
  }

  ngOnInit() {
    //
  }

  selectionPercentage() {
    const {formValues} = this.wodConfigService;

    return Math.round(formValues.wodTypesSelectablesCount / formValues.wodMaximumMovements * 100);
  }

  listSelectables() {
    return this.wodConfigService.listSelectables();
  }

  setWodSelection($event, t) {
    if (!this.wodConfigService.toggleSelectable(t)) {
      $event.preventDefault();
    }
  }

  routeToWorkout() {
    if (this.formValues.wodParams.wodType === 'time') {
      console.log('CustomizeComponent::routeToWorkout::workout-time');

      this.router.navigate(['/wod-time']);
    }

    if (this.formValues.wodParams.wodType === 'rounds') {
      console.log('CustomizeComponent::routeToWorkout::workout-rounds');

      this.router.navigate(['/wod-rounds']);
    }
  }

}
