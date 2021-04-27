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
      const word = _.last(array);
      const payload = {
        raw,
        trim,
        array,
        word,
      };
      this.text.push(payload);
      this.subject.next(payload);
    }
  }

  speak(speakThis) {
    const utterance = new SpeechSynthesisUtterance(speakThis);
    utterance.rate = 0.8;
    utterance.pitch = 1; //0 to 2
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
