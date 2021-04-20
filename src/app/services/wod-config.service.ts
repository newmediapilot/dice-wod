import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WodConfigService {

  formValues = {
    wodParams: {
      wodType: null, // time or reps
      wodTime: 0, // seconds for wod to last
      wodRounds: 0, // rounds for wod to last (time is 3600s)
      wodSets: 0, // sets for for to last
      wodSetsDone: 0, // sets completed
    },
    wodMaximumMovements: 6, // max selectable checkboxes
    wodTypesSelectablesCount: 0, // curr selected checkboxes
    wodTypeSelecterPool: [], // selected pool of wodTypesSelectables[0-9].checked
    wodTypesSelectables: [], // selectable list cloned from wodTypes
    // master list, never modified only copied
    wodTypes: [
      // lats
      {name: 'Pull Down'},
      {name: 'Bent Over Row'},
      {name: 'Pull Up'},
      // abdomen
      {name: 'Sit-up'},
      {name: 'V-Up'},
      {name: 'Leg Raise'},
      // oblique
      {name: 'Windmill'},
      {name: 'Side Plank'},
      {name: 'Russian Twist'},
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

  /**
   * toggle a single item in the list of selectables
   * check if it's possible via max value
   * return false if not selectable
   * @param selection
   */
  toggleSelectable(selection) {
    const indexOf = this.formValues.wodTypesSelectables.indexOf(selection);
    const selectable = this.formValues.wodTypesSelectables[indexOf];

    if (this.isMaxedOutSelectables() && !selectable.checked) {
      return false;
    } else {

      selectable.checked = !selectable.checked;

      this.formValues.wodTypeSelecterPool = this.formValues.wodTypesSelectables.filter(item => {
        return item.checked;
      });

      this.formValues.wodTypesSelectablesCount = this.formValues.wodTypesSelectables.filter(item => {
        return item.checked;
      }).length;

      return true;
    }

  }

  /**
   * check if we selected too many/enough
   */
  isMaxedOutSelectables() {
    return this.formValues.wodTypesSelectablesCount >= 6;
  }

  /**
   * sort selectable list by its alpha values only
   * ignore special characters && numbers
   */
  listSelectables() {
    return this.formValues.wodTypesSelectables.sort(function (a, b) {
      var nameA = a.name.toUpperCase().replaceAll("[^A-Za-z]+", ""); // ignore upper and lowercase, keep only alphas
      var nameB = b.name.toUpperCase().replaceAll("[^A-Za-z]+", ""); // ignore upper and lowercase, keep only alphas
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }

  /**
   * fetch one random wod
   * generate random reps
   * minimum reps is 2
   * TODO: increase reps @see below
   * TODO: categorize wods as symmetrical (meaning if something takes a left and right arm it should be increased to at least 4)
   * TODO: categorize wods as repeating (meaning if it's something very repetitive it shoudl be doubled ex. squats or jumps)
   */
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
}
