import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction';
import { BehaviorSubject, flatMap, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  _transactions = new BehaviorSubject<Transaction[]>([]);
  transactions$ = this._transactions.asObservable();

  constructor() { }


//FOR TESTING PURPOSES
  getTotalIncome() {
    return new Observable<number | undefined>((observer) => {
      observer.next(200);
    })  
  }

  getTotalExpense() {
    return new Observable<number | undefined>((observer) => {
      observer.next(400);
    })
  }
  getTotalBalance() {
    return new Observable<number |undefined>((observer) => {
      observer.next(800);
    })
  }
  getLatestTransactions() {
    return this.transactions$;
  }
}
