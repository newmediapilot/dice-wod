import {Injectable} from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class WodConfigService {

  formValues = {
    wodParams: {
      wodType: null, // time or reps
      wodTime: 0, // seconds for wod to excludeMovement
      wodSets: 0, // sets for for to excludeMovement
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
    wodTypeMovementPool: [], // randomly generated pool of wods from selector pool
    wodTypesSelectables: [], // selectable list cloned from wodTypes
    // master list, never modified only copied
    wodTypes: [
      {
        name: 'Shoulder Tap',
        min: 6,
        max: 20,
        symmetrical: true
      },
      {
        name: 'Dead-lift',
        min: 5,
        max: 15
      },
      {
        name: 'Bench',
        min: 5,
        max: 15
      },
      {
        name: 'Snatch',
        min: 3,
        max: 9
      },
      {
        name: 'Front Squat',
        min: 5,
        max: 10
      },
      {
        name: 'Back Squat',
        min: 5,
        max: 10
      },
      {
        name: 'Clean',
        min: 3,
        max: 9
      },
      {
        name: 'Clean & Jerk',
        min: 3,
        max: 6
      },
      {
        name: 'Mountain Climber',
        min: 8,
        max: 20,
        symmetrical: true
      },
      {
        name: 'Push Up',
        min: 5,
        max: 15
      },
      {
        name: 'Pike Push Up',
        min: 5,
        max: 10
      },
      {
        name: 'Hindu Push Up',
        min: 5,
        max: 10
      },
      {
        name: 'Overhead Press',
        min: 5,
        max: 10
      },
      {
        name: 'Handstand Push Up',
        min: 5,
        max: 10
      },
      {
        name: 'Pull Down',
        min: 5,
        max: 15
      },
      {
        name: 'Bent Over Row',
        min: 5,
        max: 10
      },
      {
        name: 'Pull Up',
        min: 5,
        max: 10
      },
      {
        name: 'Sit-up',
        min: 10,
        max: 15
      },
      {
        name: 'V-Up',
        min: 5,
        max: 15
      },
      {
        name: 'Hanging Leg Raise',
        min: 5,
        max: 15
      },
      {
        name: 'Standing Leg Raise',
        min: 10,
        max: 30,
        symmetrical: true
      },
      {
        name: 'Knee to Elbow',
        min: 5,
        max: 15
      },
      {
        name: 'Toe to Bar',
        min: 5,
        max: 15
      },
      {
        name: 'Jumping Jack',
        min: 15,
        max: 30
      },
      {
        name: 'Athletic Jump',
        min: 10,
        max: 30,
        symmetrical: true
      },
      {
        name: 'Windmill',
        min: 8,
        max: 20,
        symmetrical: true
      },
      {
        name: 'Russian Twist',
        min: 8,
        max: 20,
        symmetrical: true
      },
      {
        name: 'Lunge',
        min: 10,
        max: 30,
        symmetrical: true
      },
      {
        name: 'Jumping Lunge',
        min: 10,
        max: 30,
        symmetrical: true
      },
      {
        name: 'Spiderman Lunge',
        min: 6,
        max: 14
      },
      {
        name: 'Step-Back Lunge',
        min: 10,
        max: 30,
        symmetrical: true
      },
      {
        name: 'Air Squat',
        min: 10,
        max: 30
      },
      {
        name: 'Athletic Burpee',
        min: 5,
        max: 15
      },
      {
        name: 'Burpee',
        min: 5,
        max: 15
      },
      {
        name: 'Devil Press',
        min: 5,
        max: 15
      },
      {
        name: 'Good Morning',
        min: 5,
        max: 15
      },
      {
        name: 'Russian Dead-lift',
        min: 5,
        max: 15
      },
      {
        name: 'Sumo Dead-lift',
        min: 5,
        max: 15
      },
      {
        name: 'Sumo High-Pull',
        min: 5,
        max: 15
      },
      {
        name: 'Turkish Get-up',
        min: 4,
        max: 10,
        symmetrical: true
      },
    ],
    wodRepAmounts: (() => {
      const array = [{value: "undefined", label: "Select reps"}];
      for (let i = 1; i <= 20; i++) array.push({value: String(i * 5), label: `${i * 5} rounds`});
      return array;
    })(),
    wodTimeAmounts: (() => {
      const array = [
        {value: "undefined", label: "Select duration"},
        {value: 1, label: "1 Second Test"}
      ];
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
   * resets selections for rounds/time dropdowns
   */
  resetWodSelectors(){
    this.formValues.wodParams.wodSets = undefined;
    this.formValues.wodParams.wodTime = undefined;
    this.formValues.wodParams.wodType = undefined;
  }

  selectRandomReps(move) {
    const movement = move;
    let repNum = 0;

    // here we determine the minimum reps + random up to max reps
    // we use ceil because random will never reach the max without a push
    repNum = movement.min + Math.ceil(Math.random() * (movement.max - movement.min));

    // if a movement takes both arms or legs we make it an even number
    if (movement.symmetrical) {
      repNum = Math.ceil((repNum / 2)) * 2
    }

    return repNum;
  }

  selectRandomMove(excludeMovement?) {
    let pool = this.formValues.wodTypeSelectorPool;
    if (excludeMovement) {
      pool = _.filter(pool, (item) => {
        return item.name !== excludeMovement.name;
      });
    }
    const randomSelector = Math.floor(Math.random() * pool.length);
    return pool[randomSelector];
  }

  generateRandomMoveReps(excludeMovement?) {
    const move = this.selectRandomMove(excludeMovement);
    const reps = this.selectRandomReps(move);
    return {
      name: move.name,
      reps: reps
    }
  }

  generateRandomWODs(maxRounds) {

    console.log('WodConfigService::generateRandomWODs::maxRounds', maxRounds);

    // add first wod without any checks
    const movementPool = [this.generateRandomMoveReps()];
    // counter for random generator
    let curr = 0;
    // next proposed movement
    let next = null;
    // last existing movement
    let excludeMovement = null;

    // generate a random item - as long as it's different
    // from the last item; we don't want back to back movements
    while (curr < maxRounds && this.formValues.wodTypeSelectorPool.length) {
      excludeMovement = _.last(movementPool);
      next = this.generateRandomMoveReps(excludeMovement);
      movementPool.push(next);
      curr++;
    }

    // populate movement pool for "random generation"
    this.formValues.wodTypeMovementPool = movementPool;

    // report list of items to pick from
    movementPool.forEach((item) => {
      console.log('WodConfigService::generateRandomWODs', item.name, item.reps);
    })
  }

  /**
   * fetch one random wod from generated
   * pool @see generateRandomWODs(number)
   */
  fetchNextMovement() {
    const current = this.formValues.wodTypeMovementPool.pop();
    const upcoming = _.last(this.formValues.wodTypeMovementPool);
    return {
      current,
      upcoming
    }
  }
}
