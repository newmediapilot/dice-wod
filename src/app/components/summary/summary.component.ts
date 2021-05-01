import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {WodConfigService} from '../../services/wod-config.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  wodList;
  wodCategories;
  wodCategoriesList;

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
    this.wodCategoriesList = [];

    for (let i = 0; i < this.wodList.length; i++) {
      const item = this.wodList[i];

      if (!this.wodCategories[item.key]) {
        this.wodCategories[item.key] = {
          key: item.key,
          name: item.name,
          reps: 0,
          timeDuration: {
            raw: 0,
            label: null,
          },
          timeAverage: {
            raw: 0,
            label: null,
          },
          list: [],
        };
      }

      const category = this.wodCategories[item.key];

      category.reps += item.reps;

      category.timeDuration.raw += item.timeDuration.raw;
      category.timeDuration.label = moment(category.timeDuration.raw).format('mm:ss:SSS').toString();

      category.timeAverage.raw = Math.floor(category.timeDuration.raw / category.reps);
      category.timeAverage.label = moment(category.timeAverage.raw).format('mm:ss:SSS').toString();

      category.list.push(item);
    }

    for (let j in this.wodCategories) {
      this.wodCategoriesList.push(this.wodCategories[j]);
    }

    this.wodCategoriesList = _.sortBy(this.wodCategoriesList, (item) => {
      return item.name;
    });

    console.log('SummaryComponent::wodCategories', this.wodCategories);
    console.log('SummaryComponent::wodCategoriesList', this.wodCategoriesList);
  }

  exitSummary() {
    this.router.navigate(['start']);
  }

}
