import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "@environments/enviroment.dev";

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  protected http = inject(HttpClient);
  protected apiUrl = environment.apiUrl;
  protected baseUrl!: string;

  retrieve<T>(): Observable<T> {
    return this.http.get<T>(this.baseUrl)
  }

  retrieveAll<T>(): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/list`)
  }

  retrieveById<T>(id: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`)
  }

  create<ResT, CreateT>(data: CreateT): Observable<ResT> {
    return this.http.post<ResT>(`${this.baseUrl}/create`, data)
  }

  update<ResT, UpdateT>(id: number, data: UpdateT): Observable<ResT> {
    return this.http.put<ResT>(`${this.baseUrl}/update`, data)
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
}
