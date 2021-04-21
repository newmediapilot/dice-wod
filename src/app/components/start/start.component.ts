import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {WodConfigService} from '../../services/wod-config.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  formValues = null;

  constructor(private wodConfigService: WodConfigService) {
    this.formValues = wodConfigService.formValues
  }

  ngOnInit() {
    //
  }

  setWodMode($event, t) {
    if (t === this.formValues.wodParams.wodType) $event.preventDefault();

    this.formValues.wodParams.wodType = t;
  }

  setWodSets($event, t) {
    this.formValues.wodParams.wodSets = Number(this.formValues.wodParams.wodSets);
  }

}
