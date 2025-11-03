import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "@environments/enviroment.dev";

@Injectable({
  providedIn: 'root'
});
export class BaseService {
  private _http = inject(HttpClient);
  protected baseUrl = environment.apiUrl;

  retrieve<T>(): Observable<T> {
    return this._http.get<T>(this.baseUrl)
  }

  retrieveAll<T>(): Observable<T> {
    return this._http.get<T>(this.baseUrl)
  }

  retrieveById<T>(id: number): Observable<T> {
    return this._http.get<T>(`${this.baseUrl}/${id}`)
  }

  create<ResT, CreateT>(data: CreateT): Observable<ResT> {
    return this._http.post<ResT>(this.baseUrl, data)
  }

  update<ResT, UpdateT>(id: number, data: UpdateT): Observable<ResT> {
    return this._http.put<ResT>(`${this.baseUrl}/${id}`, data)
  }

  delete(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/${id}`)
  }
}
