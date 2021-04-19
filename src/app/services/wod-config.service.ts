import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WodConfigService {

  formValues = {
    wodParams: {
      wodType: null,
      wodTime: 0,
      wodRounds: 0,
    },
    wodMaximumMovements: 6,
    wodTypesSelectablesCount: 0,
    wodTypeSelecterPool: [],
    wodTypesSelectables: [],
    wodTypes: [
      // lats
      {name: 'Pull Down'},
      {name: 'Bent Over Row'},
      {name: 'Pull Up'},
      // abdomen
      {name: 'Sit-up'},
      {name: 'V-Up'},
      {name: 'Leg Raise'},
      // core
      {name: 'Plank Hold'},
      {name: 'Squat Hold'},
      {name: 'Pike Hold'},
      // oblique
      {name: 'Windmill'},
      {name: 'Side Plank'},
      {name: 'Turkish Get-Up'},
      // legs
      {name: 'Lunge'},
      {name: 'Spiderman Lunge'},
      {name: 'Step-Back Lunge'},
      // legs
      {name: 'Air Squat'},
      {name: 'Front Squat'},
      {name: 'Back Squat'},
      // full body
      {name: 'Athletic Burpee'},
      {name: 'Burpee'},
      {name: 'Devil Press'},
      // hinge
      {name: 'Good Morning'},
      {name: 'Deadlift'},
      {name: 'Russian Deadlift'},
    ]
  };

  /**
   * here we copy the list from the original list
   * so we can modify it in the selections
   */
  generateCheckboxList() {
    if (!this.formValues.wodTypesSelectables.length) {
      this.formValues.wodTypesSelectables = JSON.parse(JSON.stringify(this.formValues.wodTypes));
    }
  }

  generateRandomWOD() {
    const randomSelector = Math.floor(Math.random() * this.formValues.wodTypeSelecterPool.length);
    let reps = Math.ceil(Math.random() * 6);
    const {name} = this.formValues.wodTypeSelecterPool[randomSelector] || {name: 'not-found'};

    if (reps <= 1) {
      reps = 2;
    }

    return {
      name: name,
      reps: reps,
    }
  }

  constructor() {
  }
}
