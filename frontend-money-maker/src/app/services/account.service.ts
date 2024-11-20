import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap, of, tap, shareReplay, share } from 'rxjs';
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
          httpClient
            .get<Account[]>(env.baseUrl + '/accounts')
            .pipe(tap(accounts => this.accounts.next(accounts))) :
          of(accounts)})
    ).pipe(
      shareReplay(1)
    );

    this.account = new BehaviorSubject<Account | undefined>(undefined);
    this.account$ = this.account.asObservable();
    this.loggedIn$ = this.account$.pipe(map(x => !x === undefined))
  }


  //public accountNamesAndIds$ = this.accounts$
  //  .pipe(map(accounts => accounts?.map( ({id, name}) => {return {id, name}} )))

  public addAccount(account: Account) {
    this.accounts.next(this.accounts.getValue()?.concat(account))
  }

  public fetchAccounts() {
    this.httpClient.get<Account[]>(env.baseUrl + '/accounts').subscribe(accounts => {
      this.accounts.next(accounts);
    })
  }

  public refetchSelectedAccount() {
    this.httpClient
      .get<Account>(env.baseUrl 
        + '/accounts' + '/' + this.account?.getValue()?.id).subscribe(account => {
        this.account.next(account);
      })
  }


}
