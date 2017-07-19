import {Component, Injectable,Input,Output,EventEmitter} from '@angular/core'


@Injectable()
export class SharedService {
  @Output() eventEmitter: EventEmitter<any> = new EventEmitter();

   constructor() {
   }

   signedIn(isSignedIn) {
     this.eventEmitter.emit(isSignedIn);
   }

   getEmittedValue() {
     return this.eventEmitter;
   }

}
