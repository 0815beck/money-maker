import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction';
import { BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {env} from '../env';
import { AccountService } from './account.service';

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

//TODO: Vllt noch so ändern, dass der globale state
//angepasst wird, nachdem transaktionen gelöscht/... wurden
//Gerade ist es so, dass sowohl die accounts liste (mit ALLEN TRANSAKTIONEN JEMALS)
//als auch der ausgewählte account geupdated werden

}
