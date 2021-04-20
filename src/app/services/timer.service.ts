import {Injectable} from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  interval;
  rawLimit;
  rawTime = 0;
  callback;

  constructor(seconds) {
    this.rawLimit = seconds * 1000;
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
    console.log('this.rawTime', this.rawTime);
    console.log('this.rawLimit', this.rawLimit);
    if (this.rawTime >= this.rawLimit) {
      this.stop();
      this.rawTime = this.rawLimit;
      this.callback();
    }
  }

 public start() {
    this.stop();
    this.interval = setInterval(() => {
      this.tick();
    }, 10);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  done(cb) {
    this.callback = cb;
  }

}
