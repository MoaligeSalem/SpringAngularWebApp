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

  constructor() { }

  async changeParam(param) {
    this.paramSource.next(param)
    console.log(param)
  }

  async changeParam2(param) {
    this.paramSource2.next(param)
    console.log(param)
  }
}
