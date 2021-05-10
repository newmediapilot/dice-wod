import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class WodConfigService {

  formValues = {
    wodParams: {
      wodType: null, // time or reps
      wodTime: 0, // seconds for wod to excludeMovement
      wodSets: 0, // sets for for to excludeMovement
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
        "name": "Air Squat",
        "min": 10,
        "max": 30,
        "key": "air_squat"
      },
      {
        "name": "Alternating Snatch",
        "min": 6,
        "max": 10,
        "symmetrical": true,
        "key": "alternating_snatch"
      },
      {
        "name": "Athletic Burpee",
        "min": 5,
        "max": 15,
        "key": "athletic_burpee"
      },
      {
        "name": "Athletic Jump",
        "min": 10,
        "max": 30,
        "symmetrical": true,
        "key": "athletic_jump"
      },
      {
        "name": "Back Squat",
        "key": "back_squat",
        "min": 5,
        "max": 10
      },
      {
        "name": "Bench Press",
        "key": "bench_press",
        "min": 5,
        "max": 15
      },
      {
        "name": "Bent Over Row",
        "min": 5,
        "max": 10,
        "key": "bent_over_row"
      },
      {
        "name": "Bird Dog",
        "min": 6,
        "max": 14,
        "symmetrical": true,
        "key": "bird_dog"
      },
      {
        "name": "Burpee",
        "min": 5,
        "max": 15,
        "key": "burpee"
      },
      {
        "name": "Clean",
        "min": 3,
        "max": 9,
        "key": "clean"
      },
      {
        "name": "Clean & Jerk",
        "min": 3,
        "max": 6,
        "key": "clean_&_jerk"
      },
      {
        "name": "Contralateral Dead-Bug",
        "min": 8,
        "max": 14,
        "symmetrical": true,
        "key": "contralateral_dead_bug"
      },
      {
        "name": "Cradle Lunge",
        "min": 6,
        "max": 12,
        "symmetrical": true,
        "key": "cradle_lunge"
      },
      {
        "name": "Curtsy Lunge",
        "min": 6,
        "max": 14,
        "symmetrical": true,
        "key": "curtsy_lunge"
      },
      {
        "name": "Dead-lift",
        "key": "dead_lift",
        "min": 5,
        "max": 15
      },
      {
        "name": "Devil Press",
        "min": 5,
        "max": 15,
        "key": "devil_press"
      },
      {
        "name": "Front Squat",
        "key": "front_squat",
        "min": 5,
        "max": 10
      },
      {
        "name": "Good Morning",
        "min": 5,
        "max": 15,
        "key": "good_morning"
      },
      {
        "name": "Handstand Push Up",
        "min": 5,
        "max": 10,
        "key": "handstand_push_up"
      },
      {
        "name": "Hanging Leg Raise",
        "min": 5,
        "max": 15,
        "key": "hanging_leg_raise"
      },
      {
        "name": "Hindu Push Up",
        "min": 5,
        "max": 10,
        "key": "hindu_push_up"
      },
      {
        "name": "Jumping Jack",
        "min": 15,
        "max": 30,
        "key": "jumping_jack"
      },
      {
        "name": "Jumping Lunge",
        "min": 10,
        "max": 30,
        "symmetrical": true,
        "key": "jumping_lunge"
      },
      {
        "name": "Knee to Elbow",
        "min": 5,
        "max": 15,
        "key": "knee_to_elbow"
      },
      {
        "name": "Kossack Squats",
        "min": 8,
        "max": 14,
        "symmetrical": true,
        "key": "kossack_squats"
      },
      {
        "name": "Lunge",
        "min": 10,
        "max": 30,
        "symmetrical": true,
        "key": "lunge"
      },
      {
        "name": "Mountain Climber",
        "min": 8,
        "max": 20,
        "symmetrical": true,
        "key": "mountain_climber"
      },
      {
        "name": "Overhead Press",
        "min": 5,
        "max": 10,
        "key": "overhead_press"
      },
      {
        "name": "Pike Push Up",
        "min": 5,
        "max": 10,
        "key": "pike_push_up"
      },
      {
        "name": "Pull Down",
        "min": 5,
        "max": 15,
        "key": "pull_down"
      },
      {
        "name": "Pull Up",
        "min": 5,
        "max": 12,
        "key": "pull_up"
      },
      {
        "name": "Push Up",
        "min": 5,
        "max": 15,
        "key": "push_up"
      },
      {
        "name": "Renegade Row",
        "min": 6,
        "max": 14,
        "symmetrical": true,
        "key": "renegade_row"
      },
      {
        "name": "Ring Push Up",
        "min": 5,
        "max": 15,
        "key": "ring_push_up"
      },
      {
        "name": "Ring Row",
        "min": 5,
        "max": 15,
        "key": "ring_row"
      },
      {
        "name": "Romanian Dead-lift",
        "min": 5,
        "max": 15,
        "key": "romanian_dead_lift"
      },
      {
        "name": "Russian Twist",
        "min": 8,
        "max": 20,
        "symmetrical": true,
        "key": "russian_twist"
      },
      {
        "name": "Scap Retractions",
        "min": 6,
        "max": 10,
        "key": "scap_retractions"
      },
      {
        "name": "Scorpion Reach",
        "min": 6,
        "max": 14,
        "symmetrical": true,
        "key": "scorpion_reach"
      },
      {
        "name": "Shoulder Tap",
        "key": "shoulder_tap",
        "min": 6,
        "max": 20,
        "symmetrical": true
      },
      {
        "name": "Sit-up",
        "min": 10,
        "max": 15,
        "key": "sit_up"
      },
      {
        "name": "Snatch",
        "key": "snatch",
        "min": 3,
        "max": 9
      },
      {
        "name": "Spiderman Lunge",
        "min": 6,
        "max": 14,
        "symmetrical": true,
        "key": "spiderman_lunge"
      },
      {
        "name": "Split Squat",
        "min": 8,
        "max": 20,
        "symmetrical": true,
        "key": "split_squat"
      },
      {
        "name": "Standing Leg Raise",
        "min": 10,
        "max": 30,
        "symmetrical": true,
        "key": "standing_leg_raise"
      },
      {
        "name": "Step-Back Lunge",
        "min": 10,
        "max": 30,
        "symmetrical": true,
        "key": "step_back_lunge"
      },
      {
        "name": "Sumo Dead-lift",
        "min": 5,
        "max": 15,
        "key": "sumo_dead_lift"
      },
      {
        "name": "Sumo High-Pull",
        "min": 5,
        "max": 15,
        "key": "sumo_high_pull"
      },
      {
        "name": "Toe to Bar",
        "min": 5,
        "max": 15,
        "key": "toe_to_bar"
      },
      {
        "name": "Trap Raise",
        "min": 5,
        "max": 15,
        "key": "trap_raise"
      },
      {
        "name": "Turkish Get-up",
        "min": 4,
        "max": 10,
        "symmetrical": true,
        "key": "turkish_get_up"
      },
      {
        "name": "V-Up",
        "min": 5,
        "max": 15,
        "key": "v_up"
      },
      {
        "name": "Windmill",
        "min": 8,
        "max": 20,
        "symmetrical": true,
        "key": "windmill"
      }
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

  debug() {
    let wodList = this.formValues.wodTypes;
    wodList = _.map(wodList, (item) => {
      item.key = item.name.toLowerCase();
      item.key = item.key.replace(/\s/g, '_')
      item.key = item.key.replace(/\-/, '_');
      return item;
    });
    wodList = _.sortBy(wodList, (item) => {
      return item.key;
    });
    for (let i in wodList) {
      console.log(wodList[i]);
    }
    console.log(JSON.stringify(wodList, null, 2));
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
  resetWodSelectors() {
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
      ...move,
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

  generateTimeStamp(milliseconds) {
    return {
      raw: milliseconds,
      label: moment(milliseconds).format('mm:ss:SSS').toString(),
      dateString: new Date(milliseconds).toString(),
    }
  }

  /**
   * timestamps the last movement (current)
   */
  triggerCurrentMovementStarted() {
    console.log('WodConfigService::triggerMovementStarted');
    const current = _.last(this.formValues.userData.wodSetsDone);
    current.timeStarted = this.generateTimeStamp(new Date().getTime());
  }

  /**
   * timestamps the second last movement (previously done)
   */
  triggerPreviousMovementDone() {
    console.log('WodConfigService::triggerMovementComplete');

    const previous = this.formValues.userData.wodSetsDone[this.formValues.userData.wodSetsDone.length - 2];

    if (!!previous) {
      previous.timeComplete = this.generateTimeStamp(new Date().getTime());
      previous.timeDuration = this.generateTimeStamp(new Date().getTime() - previous.timeStarted.raw);
    }
  }

  /**
   * timestamps for the absolute last movement
   */
  triggerFinalMovementDone() {
    console.log('WodConfigService::triggerFinalMovementDone');

    const previous = this.formValues.userData.wodSetsDone[this.formValues.userData.wodSetsDone.length - 2];
    const final = _.last(this.formValues.userData.wodSetsDone);
    final.timeComplete = this.generateTimeStamp(new Date().getTime());
    final.timeDuration = this.generateTimeStamp(new Date().getTime() - previous.timeStarted.raw);
  }

  /**
   * fetch one random wod from generated
   * pool @see generateRandomWODs(number)
   */
  fetchNextMovement() {
    const current = this.formValues.wodTypeMovementPool.pop();
    const upcoming = _.last(this.formValues.wodTypeMovementPool);
    this.formValues.userData.wodSetsDone.push(current);
    return {
      current,
      upcoming
    }
  }
}
