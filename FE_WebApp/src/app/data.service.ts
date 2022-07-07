import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private paramSource = new BehaviorSubject(null);
  sharedParam = this.paramSource.asObservable();

  private paramSource2 = new BehaviorSubject(null);
  sharedParam2 = this.paramSource2.asObservable();

  private paramSource3 = new BehaviorSubject(null);
  sharedParam3 = this.paramSource3.asObservable();

  private paramSource4 = new BehaviorSubject(null);
  sharedParam4 = this.paramSource4.asObservable();

  // private paramSource5 = new BehaviorSubject(null);
  // sharedParam5 = this.paramSource5.asObservable();


  constructor() { }

  async changeParam(param) {
    this.paramSource.next(param)
  }

  async changeParam2(param) {
    this.paramSource2.next(param)
  }

  async changeParam3(param) {
    this.paramSource3.next(param)
  }

  async changeParam4(param) {
    this.paramSource4.next(param)
  }

  // async changeParam5(param) {
  //   this.paramSource5.next(param)
  // }
}
