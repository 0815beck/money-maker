import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction';
import { BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {env} from '../env';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  _transactions = new BehaviorSubject<Transaction[]>([]);
  transactions$ = this._transactions.asObservable();

  constructor(private http: HttpClient) { }

  getTransactions() : Observable<Transaction[]> {
    return this.http.get<Transaction[]>(env.baseUrl + "/transaction");
  }

  addTransaction(transaction: Transaction): Observable<Transaction>{
    return this.http.post<Transaction>(env.baseUrl + "/transaction", transaction);
  }

  modifyTransaction(transaction: Transaction): Observable<Transaction>{
    return this.http.put<Transaction>(env.baseUrl + "/transaction", transaction);
  }

  deleteTransaction(id: number): Observable<void>{
    return this.http.delete<void>(env.baseUrl + "/transaction/"+id);
  }

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
