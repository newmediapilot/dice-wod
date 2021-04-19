import {Injectable} from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  interval;
  rawLimit;
  rawTime = 0;

  constructor(seconds) {
    this.rawLimit = seconds * 1000;
  }

  restart() {
    this.rawTime = 0;
    this.start();
  }

  get time() {
    return {
      raw: this.rawTime,
      rawReverse: this.rawLimit - this.rawTime,
      countdown: moment(this.rawLimit - this.rawTime).format('mm:ss:SSS').toString(),
      stopwatch: moment(this.rawTime).format('mm:ss:SSS').toString()
    };
  }

  tick() {
    this.rawTime += 10;
    if (this.rawTime >= this.rawLimit) {
      this.clear();
      this.rawTime = this.rawLimit;
    }
  }

  start() {
    this.clear();
    this.interval = setInterval(() => {
      this.tick();
    }, 10);
  }

  clear() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  done(cb) {
    cb();
  }

}
