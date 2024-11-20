import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap, of, tap, shareReplay, share, take } from 'rxjs';
import { Account } from '../models/account';
import { HttpClient } from '@angular/common/http';
import { env } from '../env';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private account;
  public account$;
  public loggedIn$;

  private accounts;
  public accounts$;

  constructor(private httpClient: HttpClient) {

    this.accounts = new BehaviorSubject<Account[] | undefined>(undefined);
    this.accounts$ = this.accounts
      .asObservable()
      .pipe(
        switchMap(accounts => {
          return accounts === undefined ?
            this.httpClient
              .get<Account[]>(env.baseUrl + '/accounts')
              .pipe(tap(accounts => this.accounts.next(accounts))) :
            of(accounts)})
      )
      .pipe(
        shareReplay(1)
      );

    this.account = new BehaviorSubject<Account | undefined>(undefined);
    this.account$ = this.account.asObservable();
    this.loggedIn$ = this.account$.pipe(map(x => !x === undefined))

//set default account
    this.accounts
      .asObservable()
      .pipe(take(2))
      .subscribe(accounts => {
        if (accounts) { this.account.next(accounts[0]) }
      })
  }

  //public accountNamesAndIds$ = this.accounts$
  //  .pipe(map(accounts => accounts?.map( ({id, name}) => {return {id, name}} )))

  public addAccount(account: Account): Observable<Account> {
    this.accounts.next(this.accounts.getValue()?.concat(account));
  return this.httpClient.post<Account>(env.baseUrl + "/accounts", account)
  };


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
