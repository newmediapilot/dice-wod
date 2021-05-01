import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TimerService} from '../../../services/timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  timer: TimerService;
  timerDuration: number = 0;
  countdown: number = 10;
  isCountdown: boolean = true;
  isPaused: boolean = true;

  @Output() pauseStateChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() timerStateCompleted: EventEmitter<TimerService> = new EventEmitter<TimerService>();
  @Output() timerStateCountingUp: EventEmitter<TimerService> = new EventEmitter<TimerService>();
  @Input()
  set duration(timerDuration) {
    this.timerDuration = timerDuration;

    if (this.timer) this.timer.stop();
  }

  ngOnInit(): void {
    if (0 === this.timerDuration) {
      console.log("TimerComponent:timerDuration is zero!");
      return;
    }
    this.timer = new TimerService(this.countdown);
    this.isCountdown = true;
    this.timer.done(() => {
      this.timer.stop();
      this.begin();
    });
  }

  get pausedState() {
    return this.isPaused;
  }

  pause() {
    this.timer.stop();
    this.isPaused = true;
    this.pauseStateChanged.emit(this.isPaused);
  }

  resume() {
    this.timer.start();
    this.isPaused = false;
    this.pauseStateChanged.emit(this.isPaused);
  }

  toggle() {
    if (this.isPaused) {
      this.resume();
    } else {
      this.pause();
    }
  }

  begin() {
    this.isCountdown = false;
    this.timer = new TimerService(this.timerDuration);
    this.timer.done(() => {
      this.done();
    });
    this.timer.start();
    this.timerStateCountingUp.emit(this.timer);
  }

  get time() {
    const {countdown, stopwatch} = this.timer.time;

    return (this.isCountdown) ? countdown : stopwatch;
  }

  done() {
    console.log("TimerComponent::done");
    this.timerStateCompleted.emit(this.timer);
  }

}
