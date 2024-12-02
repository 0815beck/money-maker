import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction';
import { Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {env} from '../env';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

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

  getTransactionByID(id: string): Observable<Transaction>{
    return this.http.get<Transaction>(env.baseUrl + "/transaction/"+id);
  }

}
