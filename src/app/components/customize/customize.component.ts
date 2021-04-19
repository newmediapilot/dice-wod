import {Component, OnDestroy, OnInit} from '@angular/core';
import {WodConfigService} from '../../services/wod-config.service';

@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.scss']
})
export class CustomizeComponent implements OnInit {

  formValues = null;

  constructor(private wodConfigService: WodConfigService) {
    this.formValues = wodConfigService.formValues;

    this.wodConfigService.generateCheckboxList();
  }

  ngOnInit() {
    //
  }

  listSelectables() {
    return this.wodConfigService.listSelectables();
  }

  setWodSelection($event, t) {
    if (!this.wodConfigService.toggleSelectable(t)) {
      $event.preventDefault();
    }
  }

}
