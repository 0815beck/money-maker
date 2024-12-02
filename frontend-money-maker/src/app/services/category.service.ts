import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../models/category';
import {env} from '../env';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(env.baseUrl + "/categories");
  }

  deleteCategory(id:number): Observable<void>{
    return this.http.delete<void>(env.baseUrl+"/categories/" + id);
  }

  addCategory(category: Category): Observable<Category>{
    return this.http.post<Category>(env.baseUrl+"/categories", category);
  }
}
