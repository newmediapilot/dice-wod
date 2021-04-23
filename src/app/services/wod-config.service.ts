import {Injectable} from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class WodConfigService {

  formValues = {
    wodParams: {
      wodType: null, // time or reps
      wodTime: 0, // seconds for wod to last
      wodSets: 0, // sets for for to last
      wodSetsDone: 0, // sets completed
    },
    userData: {
      currentWorkout: null,
      wodSetsDone: [],
      wodSetsLength: 0,
      wodPercentDone: 0,
    },
    wodMinimumMovements: 3, // min selectable checkboxes
    wodMaximumMovements: 6, // max selectable checkboxes
    wodTypesSelectablesCount: 0, // curr selected checkboxes
    wodTypeSelectorPool: [], // selected pool of wodTypesSelectables[0-9].checked
    wodTypesSelectables: [], // selectable list cloned from wodTypes
    // master list, never modified only copied
    wodTypes: [
      {name: 'Plank Shoulder Tap'},
      {name: 'Deadlift'},
      {name: 'Bench'},
      {name: 'Snatch'},
      {name: 'Front Squat'},
      {name: 'Back Squat'},
      {name: 'Clean'},
      {name: 'Clean & Jerk'},
      {name: 'Snatch'},
      {name: 'Mountain Climber'},
      {name: 'Push Up'},
      {name: 'Pike Push Up'},
      {name: 'Overhead Press'},
      {name: 'Handstand Push Up'},
      {name: 'Pull Down'},
      {name: 'Bent Over Row'},
      {name: 'Pull Up'},
      {name: 'Sit-up'},
      {name: 'V-Up'},
      {name: 'Leg Raise'},
      {name: 'Toe to Bar'},
      {name: 'Jumping Jack'},
      {name: 'Athletic Jump'},
      {name: 'Windmill'},
      {name: 'Side Plank'},
      {name: 'Russian Twist'},
      {name: 'Lunge'},
      {name: 'Spiderman Lunge'},
      {name: 'Step-Back Lunge'},
      {name: 'Air Squat'},
      {name: 'Athletic Burpee'},
      {name: 'Burpee'},
      {name: 'Devil Press'},
      {name: 'Good Morning'},
      {name: 'Russian Deadlift'},
      {name: 'Sumo Deadlift'},
    ],
    wodRepAmounts: (() => {
      const array = [{value: "undefined", label: "Select reps"}];
      for (let i = 1; i <= 20; i++) array.push({value: String(i * 5), label: `${i * 5} rounds`});
      return array;
    })(),
    wodTimeAmounts: (() => {
      const array = [{value: "undefined", label: "Select duration"}];
      for (let i = 1; i <= 20; i++) array.push({value: String(i * 5), label: `${i * 5} minutes`});
      return array;
    })(),
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

      this.formValues.wodTypeSelectorPool = this.formValues.wodTypesSelectables.filter(item => {
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
    return _.sortBy(this.formValues.wodTypesSelectables, (selectable) => {
      return selectable
        .name
        .replace(/[^A-Za-z]+/, "")
        .toUpperCase();
    });
  }

  incrementWodSetsDone() {
    this.formValues.wodParams.wodSetsDone += 1;
  }

  updateSetsDone(wodElement) {
    const {userData} = this.formValues;
    const {wodSets} = this.formValues.wodParams;
    userData.currentWorkout = wodElement;
    userData.wodSetsDone.push(wodElement);
    userData.wodSetsLength = userData.wodSetsDone.length;
    userData.wodPercentDone = (userData.wodSetsLength - 1) / wodSets;
  }

  /**
   * reset user counts for rounds/reps
   */
  resetSets() {
    const {userData} = this.formValues;
    userData.currentWorkout = null;
    userData.wodSetsDone = [];
    userData.wodSetsLength = 0;
    userData.wodPercentDone = 0;
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
    const randomSelector = Math.floor(Math.random() * this.formValues.wodTypeSelectorPool.length);
    let reps = Math.ceil(Math.random() * 6);
    const {name} = this.formValues.wodTypeSelectorPool[randomSelector] || {name: 'not-found'};

    if (reps <= 1) {
      reps = 2;
    }

    const wodElement = {
      name: name,
      reps: reps,
    };

    this.updateSetsDone(wodElement);

    return wodElement;
  }
}
