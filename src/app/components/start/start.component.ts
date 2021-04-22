import {Component, OnInit} from '@angular/core';
import {WodConfigService} from '../../services/wod-config.service';
import {ConfettiService} from '../../services/confetti.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent {

  formValues = null;

  constructor(private wodConfigService: WodConfigService) {
    this.formValues = wodConfigService.formValues
  }

  setWodMode($event, t) {
    if (t === this.formValues.wodParams.wodType) $event.preventDefault();

    // reset these for the interface to reset
    this.formValues.wodParams.wodSets = undefined;
    this.formValues.wodParams.wodTime = undefined;

    this.formValues.wodParams.wodType = t;
  }

  setWodSets($event) {
    this.formValues.wodParams.wodSets = Number(this.formValues.wodParams.wodSets);
  }

}
