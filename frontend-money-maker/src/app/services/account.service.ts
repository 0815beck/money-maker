import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, map, switchMap, of, tap, shareReplay, share, take} from 'rxjs';
import {Account} from '../models/account';
import {HttpClient} from '@angular/common/http';
import {env} from '../env';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private account = new BehaviorSubject<Account | undefined>(undefined);
  public account$ = this.account.asObservable();

  private accounts = new BehaviorSubject<Account[] | undefined>(undefined);
  public accounts$ = this.accounts.asObservable();

  constructor(private httpClient: HttpClient) {
    httpClient.get<Account[]>(env.baseUrl + '/accounts').subscribe(accounts => {
      this.accounts.next(accounts);
      this.account.next(accounts[0]);
    });
  }

  //METHODS TO CONTROL THE STATE OF accounts:

  public fetchAccounts() {
    this.httpClient.get<Account[]>(env.baseUrl + '/accounts').subscribe(accounts => {
      this.accounts.next(accounts);
      const selectedAccount = this.account.getValue();
      const updatedSelectedAccount = accounts.find(a => a.id === selectedAccount?.id);
      if (updatedSelectedAccount) {
        this.account.next(updatedSelectedAccount);
      }
      console.log('[Info] The accounts (and its associated data) has been updated.');
    });
  }

  public addAccount(account: Account): Observable<Account> {
    return this.httpClient
      .post<Account>(env.baseUrl + "/accounts", account)
      .pipe(tap(account => {
        this.accounts.next(this.accounts.getValue()?.concat(account));
        console.log('[Info] A new account has been added to the global account list:', account);
      }));
  }

  public getAccountByID(id: string): Observable<Account> {
    const idAsNum = parseInt(id);
    return this.accounts
      .pipe(map(accounts => accounts?.find(a => a.id === idAsNum)))
      .pipe(switchMap(account =>
        account === undefined ?
          this.httpClient.get<Account>(env.baseUrl + "/accounts/" + id) : of(account)
      ));
  }

  deleteAccount(id: number): Observable<void>{
    return this.httpClient
      .delete<void>(env.baseUrl + "/accounts/" + id)
      .pipe(tap(_ => {
        console.log('[Info] Account with id ' + id + ' will be removed from the accounts list.');
        this.accounts.next(this.accounts.getValue()?.filter(x => x.id !== id));
        const selectedAccount = this.account.getValue();
        if (selectedAccount?.id === id) {
          this.account.next(undefined);
        }
      }));
  }


//METHODS TO CONTROL THE STATE OF account:

  public setSelectedAccount(id: number) {
    this.account.next(
      this.accounts.getValue()?.find(account => account.id === id)
    )
  }

  public setSelectedAccountToUndefined() {
    this.account.next(undefined);
  }

  public refetchSelectedAccount() {
    this.httpClient
      .get<Account>(env.baseUrl
        + '/accounts' + '/' + this.account?.getValue()?.id).subscribe(account => {
      this.account.next(account);
      this.accounts.next(this.accounts.getValue()
        ?.map(a => a.id === account.id ? account : a));
    });
  }

  modifyAccount(modifiedAccount: Account): Observable<Account> {
    return this.httpClient
      .put<Account>(env.baseUrl + "/accounts", modifiedAccount)
      .pipe(tap(account => {
        this.accounts.next(this.accounts.getValue()
          ?.map(a => a.id === account.id ? account : a));
        this.account.next(this.account.getValue()
          ?.id === account.id ? account : this.account.getValue());
      }));
  }
}
