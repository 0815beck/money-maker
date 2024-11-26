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

//public loggedIn$ = this.account$.pipe(map(x => !x === undefined));

  private accounts = new BehaviorSubject<Account[] | undefined>(undefined);
  public accounts$ = this.accounts.asObservable();

  constructor(private httpClient: HttpClient) {
//At the start of the application, fetch accounts and choose a default account:    
    httpClient.get<Account[]>(env.baseUrl + '/accounts').subscribe(accounts => {
      this.accounts.next(accounts);
      this.account.next(accounts[0]);
    });

  }

//Methods to change the state of the accounts list variable:
  public fetchAccounts() {
    this.httpClient.get<Account[]>(env.baseUrl + '/accounts').subscribe(accounts => {
//update state
      this.accounts.next(accounts);
      const selectedAccount = this.account.getValue();
      const updatedSelectedAccount = accounts.find(a => a.id === selectedAccount?.id);
      if (updatedSelectedAccount) {
        this.account.next(updatedSelectedAccount);
      }
    });
  }

  public addAccount(account: Account): Observable<Account> {
    const observable = this.httpClient.post<Account>(env.baseUrl + "/accounts", account);
    observable.subscribe(account => {
      this.accounts.next(this.accounts.getValue()?.concat(account));
      console.log('[Info] A new account has been added to the global account list:', account);
    });
    return observable;
  }

//Bemerkung: Richtiger/sicherer wäre es hier Observable<Account | undefined> zurückzugeben,
//aber dann müsste die Details-Komponente geändert werden
  public getAccountByID(id: string): Observable<Account> {
    const idAsNum = parseInt(id);
    return this.accounts
      	.pipe(map(accounts => accounts?.find(a => a.id === idAsNum)))
        .pipe(switchMap(account => 
          account === undefined ? 
            this.httpClient.get<Account>(env.baseUrl + "/accounts/" + id) :  of(account)
        ));
  }

  deleteAccount(id: number): Observable<void>{
    const observable = this.httpClient.delete<void>(env.baseUrl + "/account");
    observable.subscribe(_ => {
      console.log('[Info] Account with id ' + id + 'will be removed from the accounts list.');
      this.accounts.next(this.accounts.getValue()?.filter(x => x.id !== id));
      const selectedAccount = this.account.getValue();
      if (selectedAccount?.id === id) {
        this.account.next(undefined);
      }
    });
    return observable;
  }
  
//Die alten Methoden:
  /*
  getAccountByID(id: string): Observable<Account>{
    return this.httpClient.get<Account>(env.baseUrl + "/accounts/" + id)
  }
  */
  /*
  public addAccount(account: Account): Observable<Account> {
    this.accounts.next(this.accounts.getValue()?.concat(account));
    return this.httpClient.post<Account>(env.baseUrl + "/accounts", account)
  };
  */


//Methoden, um den ausgewählten account zu steuern:

  public setSelectedAccount(id: number) {
    this.account.next(
      this.accounts.getValue()?.find(account => account.id === id)
    )
/*    this.httpClient
      .get<Account>(env.baseUrl+ '/accounts' + '/' + id).subscribe(account => {
        this.account.next(account);
      });*/
  }

  public setSelectedAccountToUndefined() {
    this.account.next(undefined);
  }

  public refetchSelectedAccount() {
    this.httpClient
      .get<Account>(env.baseUrl
        + '/accounts' + '/' + this.account?.getValue()?.id).subscribe(account => {
        this.account.next(account);
        this.accounts.next(this.accounts.getValue()?.map(a => a.id === account.id ? account : a));
      });
  }

  modifyAccount(modifiedAccount: Account): Observable<Account> {
    const observable = this.httpClient.put<Account>(env.baseUrl+"/accounts", modifiedAccount);
    observable.subscribe(account => {
      this.accounts.next(this.accounts.getValue()?.map(a => a.id === account.id ? account : a));
      this.account.next(this.account.getValue()?.id === account.id ? account : this.account.getValue());
    });
    return observable;
  }
}
