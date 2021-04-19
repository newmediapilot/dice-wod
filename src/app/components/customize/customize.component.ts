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
    return this.formValues.wodTypesSelectables.sort((item) => {
      return item.name;
    });
  }

  setWodSelection($event, t) {
    if (this.formValues.wodTypesSelectablesCount >= 6 && !t.checked) {
      $event.preventDefault();
      return;
    }

    t.checked = !t.checked;

    this.formValues.wodTypeSelecterPool = this.formValues.wodTypesSelectables.filter(item => {
      return item.checked;
    });

    this.formValues.wodTypesSelectablesCount = this.formValues.wodTypesSelectables.filter(item => {
      return item.checked;
    }).length;
  }

}
