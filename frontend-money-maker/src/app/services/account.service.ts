import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap, of, tap, shareReplay, share, take } from 'rxjs';
import { Account } from '../models/account';
import { HttpClient } from '@angular/common/http';
import { env } from '../env';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private account = new BehaviorSubject<Account | undefined>(undefined);
  public account$ = this.account.asObservable();
  public loggedIn$ = this.account$.pipe(map(x => !x === undefined));

  private accounts = new BehaviorSubject<Account[] | undefined>(undefined);
  public accounts$ = this.accounts.asObservable();

  constructor(private httpClient: HttpClient) {
    httpClient.get<Account[]>(env.baseUrl + '/accounts').subscribe(accounts => {
      this.accounts.next(accounts);
      this.account.next(accounts[0]);
    })
  }

  public addAccount(account: Account): Observable<Account> {
    this.accounts.next(this.accounts.getValue()?.concat(account));
    return this.httpClient.post<Account>(env.baseUrl + "/accounts", account)
  };

  getAccountByID(id: string): Observable<Account>{
    return this.httpClient.get<Account>(env.baseUrl + "/accounts/" + id)
  }


  deleteAccount(id: number): Observable<void>{
      return this.httpClient.delete<void>(env.baseUrl + "/accounts/" + id);
    }

  public fetchAccounts() {
    this.httpClient.get<Account[]>(env.baseUrl + '/accounts').subscribe(accounts => {
      this.accounts.next(accounts);
    })
  }

  public setSelectedAccount(id: number) {
    this.httpClient
      .get<Account>(env.baseUrl+ '/accounts' + '/' + id).subscribe(account => {
        this.account.next(account);
      });
  }

  public setSelectedAccountToUndefined() {
    this.account.next(undefined);
  }

  public refetchSelectedAccount() {
    this.httpClient
      .get<Account>(env.baseUrl
        + '/accounts' + '/' + this.account?.getValue()?.id).subscribe(account => {
        this.account.next(account);
      })
  }


 modifyAccount(modifiedAccount: Account): Observable<Account>{
    return this.httpClient.put<Account>(env.baseUrl+"/accounts", modifiedAccount);
 }
}
