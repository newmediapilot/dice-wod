import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {Subject} from 'rxjs';

export interface IWindow extends Window {
  webkitSpeechRecognition: any;
}

const {webkitSpeechRecognition}: IWindow = <IWindow>window;
const recognition = new webkitSpeechRecognition();

@Injectable({
  providedIn: 'root'
})
export class SpeechService {

  static SPEECH_EVENT = {
    NextMovement: 'SPEECH_EVENT::NextMovement',
    PauseTimer: 'SPEECH_EVENT::PauseTimer',
    ResumeTimer: 'SPEECH_EVENT::ResumeTimer'
  };

  text = [];
  subject = new Subject();
  isListening;

  constructor() {
    if (!('webkitSpeechRecognition' in window)) {
      console.log('SpeechService::no available speech recognition!');
      return;
    }
    recognition.continuous = true;
    recognition.lang = 'en-US';
    recognition.onresult = (event) => {
      const raw = _.last(event.results)[0].transcript;
      const trim = raw.trim();
      const array = trim.split(' ');
      const word = (_.last(array) as String).toLowerCase();
      const payload = {
        raw,
        trim,
        array,
        word,
      };
      this.text.push(payload);
      this.subject.next(
        this.interpret(payload)
      );
      setTimeout(() => {
        console.log('SpeechService::tick');
      }, 1);
    };
    /**
     * this is necessary because speech recognition
     * turns off automatically, we reset it again
     */
    recognition.onend = () => {
      if (this.isListening) {
        this.start();
      }
    }
  }

  interpret(payload) {
    if ([
      'done',
      'next',
      'finished',
    ].includes(payload.word)) {
      return {
        type: SpeechService.SPEECH_EVENT.NextMovement,
        ...payload
      };
    }
    if ([
      'stop',
      'pause',
      'wait',
      'break',
    ].includes(payload.word)) {
      return {
        type: SpeechService.SPEECH_EVENT.PauseTimer,
        ...payload
      };
    }
    if ([
      'start',
      'play',
      'go',
    ].includes(payload.word)) {
      return {
        type: SpeechService.SPEECH_EVENT.ResumeTimer,
        ...payload
      };
    }
    return payload;
  }

  speak(speakThis, cb?) {
    const utterance = new SpeechSynthesisUtterance(speakThis);
    utterance.rate = 0.8;
    utterance.pitch = 1; //0 to 2
    utterance.onend = () => {
      if (cb) cb();
    };
    window.speechSynthesis.speak(utterance);
  }

  get transcript() {
    return this.subject;
  }

  get listening() {
    return this.isListening;
  }

  start() {
    this.text = [];
    recognition.start();
    this.isListening = true;
    console.log('SpeechService::start');
  }

  stop() {
    recognition.stop();
    this.isListening = false;
    console.log('SpeechService::stop');
  }

}
