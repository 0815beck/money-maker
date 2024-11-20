import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap, of, tap, shareReplay, share } from 'rxjs';
import { Account } from '../models/account';
import { HttpClient } from '@angular/common/http';
import { env } from '../env';

@Injectable({
  providedIn: 'root'
})
export class AccountService {


  constructor(private httpClient: HttpClient) { }

  private account = new BehaviorSubject<Account | undefined>(undefined);

  public account$ = this.account.asObservable();
  public loggedIn$ = this.account$.pipe(map(x => !x === undefined));


  private accounts = new BehaviorSubject<Account[] | undefined>(undefined);
  private accounts$ = this.accounts
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

  public accountNamesAndIds$ = this.accounts$
    .pipe(map(accounts => accounts?.map( ({id, name}) => {return {id, name}} )))

  deleteAccount(id: number): Observable<void>{
/*
    this.accounts.next(this.accounts.value?.filter(account => account.id != id));
*/
    return this.httpClient.delete<void>(env.baseUrl + "/accounts/" + id);
  }

 modifyAccount(modifiedAccount: Account): Observable<Account>{
    return this.httpClient.put<Account>(env.baseUrl+"/accounts", modifiedAccount);
 }
}
