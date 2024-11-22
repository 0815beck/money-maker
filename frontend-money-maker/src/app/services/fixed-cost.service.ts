import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { Observable, of, map, switchMap, shareReplay, BehaviorSubject, Subject, merge, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { env } from '../env';
import { FixedCost } from '../models/fixed-cost';

@Injectable({
  providedIn: 'root'
})
export class FixedCostService {

  private fixedCost = new BehaviorSubject<FixedCost[] | undefined>(undefined);
  public fixedCosts$;

  constructor(
    private accountService: AccountService,
    private httpClient: HttpClient
  ) {
    this.fixedCosts$ = merge(
      this.fixedCost.asObservable(),
      this.accountService.account$.pipe(
        switchMap(account => {
          return account === undefined ?
            of(undefined) :
            this.httpClient.get<FixedCost[]>(env.baseUrl + '/accounts' + '?userId=' + account.id)
              .pipe(tap(fixedCosts => this.fixedCost.next(fixedCosts)))
        })
      )
    ).pipe(shareReplay(1))
  }

  addFixedCost(fixedCost: FixedCost): Observable<FixedCost>{
   return  this.httpClient.post<FixedCost>(env.baseUrl+"/fixedCost", fixedCost);
  }

  deleteFixedCost(id: number): Observable<void>{
    return this.httpClient.delete<void>(env.baseUrl + "/fixedCost/" + id);
  }
}
