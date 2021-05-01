import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {WodConfigService} from '../../services/wod-config.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  wodList;
  wodCategories;

  constructor(
    private wodConfigService: WodConfigService,
    private router: Router
  ) {
    //
  }

  // {
  //   "key": "alternating_snatch",
  //   "name": "Alternating Snatch",
  //   "list": [
  //     {
  //       "name": "Alternating Snatch",
  //       "min": 6,
  //       "max": 10,
  //       "symmetrical": true,
  //       "key": "alternating_snatch",
  //       "checked": true,
  //       "reps": 8,
  //       "timeStarted": {
  //         "raw": 1619854508557,
  //         "label": "35:08:557",
  //         "dateString": "Sat May 01 2021 03:35:08 GMT-0400 (Eastern Daylight Time)"
  //       },
  //       "timeComplete": {
  //         "raw": 1619854508867,
  //         "label": "35:08:867",
  //         "dateString": "Sat May 01 2021 03:35:08 GMT-0400 (Eastern Daylight Time)"
  //       },
  //       "timeDuration": {
  //         "raw": 310,
  //         "label": "00:00:310",
  //         "dateString": "Wed Dec 31 1969 19:00:00 GMT-0500 (Eastern Standard Time)"
  //       }
  //     },
  //     {
  //       "name": "Alternating Snatch",
  //       "min": 6,
  //       "max": 10,
  //       "symmetrical": true,
  //       "key": "alternating_snatch",
  //       "checked": true,
  //       "reps": 10,
  //       "timeStarted": {
  //         "raw": 1619854509124,
  //         "label": "35:09:124",
  //         "dateString": "Sat May 01 2021 03:35:09 GMT-0400 (Eastern Daylight Time)"
  //       },
  //       "timeComplete": {
  //         "raw": 1619854509443,
  //         "label": "35:09:443",
  //         "dateString": "Sat May 01 2021 03:35:09 GMT-0400 (Eastern Daylight Time)"
  //       },
  //       "timeDuration": {
  //         "raw": 319,
  //         "label": "00:00:319",
  //         "dateString": "Wed Dec 31 1969 19:00:00 GMT-0500 (Eastern Standard Time)"
  //       }
  //     }
  //   ]
  // }

  ngOnInit() {
    this.wodList = this.wodConfigService.formValues.userData.wodSetsDone;

    this.processSummary();
  }

  processSummary() {
    this.wodCategories = {};

    for (let i = 0; i < this.wodList.length; i++) {
      const item = this.wodList[i];

      if (!this.wodCategories[item.key]) {
        this.wodCategories[item.key] = {
          reps: 0,
          key: item.key,
          name: item.name,
          list: [],
        };
      }

      const category = this.wodCategories[item.key];

      category.reps += item.reps;
      category.timeDuration += item.timeDuration.raw;

      category.list.push(item);
    }
  }



  exitSummary() {
    this.router.navigate(['start']);
  }

}
