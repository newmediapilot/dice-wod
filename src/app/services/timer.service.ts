import {Injectable} from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  interval;// interval instance
  rawLimit;// raw limit in milliseconds (stops timer when complete)
  rawTime = 0;// raw counter in milliseconds (counts until rawLimit)
  callback; // function called on completion
  constructor(
    /**
     * amount of seconds to run this timer
     */
    seconds,
    /**
     * optional param whereby if the place this is
     * instantiated in no longer exists, quit the timer
     * this is for memory leak protection
     */
    context?
  ) {
    this.rawLimit = seconds * 1000;
  }

  /**
   * return complex object of timer state
   * raw: milliseconds
   * countdown: time backwards pretty
   * stopwatch: time forward pretty
   */
  get time() {
    return {
      raw: this.rawTime,
      rawReverse: this.rawLimit - this.rawTime,
      countdown: moment(this.rawLimit - this.rawTime).format('mm:ss:SSS').toString(),
      stopwatch: moment(this.rawTime).format('mm:ss:SSS').toString()
    };
  }

  /**
   * single tick to update 10 milliseconds
   * stop when value reaches max
   */
  tick() {
    this.rawTime += 10;
    if (this.rawTime >= this.rawLimit) {
      this.stop();
      this.rawTime = this.rawLimit;
      this.callback();
    }
  }

  /**
   * only start the counter mechanism
   */
  public start() {
    this.stop();
    this.interval = setInterval(() => {
      this.tick();
    }, 10);
  }

  /**
   * only stop the counter mechanism
   */
  stop() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  /**
   * define the callback to be played on completion
   * @see TimerService.tick
   * @param cb
   */
  done(cb) {
    this.callback = cb;
  }

}
