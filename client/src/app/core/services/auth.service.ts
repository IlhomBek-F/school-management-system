import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";

interface Auth {
  clearTokens(): void
  isAuthorized(): boolean;
  getAccessToken(): string;
  getRefreshToken(): string;
  saveAccessToken(access_token: string): void;
  saveRefreshToken(refresh_token: string): void;
  refreshAccessToken(): Observable<any>
}

@Injectable({
  providedIn: "root"
})
export class AuthService extends BaseService implements Auth {
  private _url = `${this.apiUrl}/auth/refresh_token`

  private readonly ACCESS_TOKEN_KEY = 'ACCESS_TOKEN_KEY'
  private readonly REFRESH_TOKEN_KEY = 'REFRESH_TOKEN_KEY'

  saveAccessToken(access_token: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, access_token);
  }

  saveRefreshToken(refresh_token: string): void {
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refresh_token);
  }

  clearTokens(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  isAuthorized(): boolean {
    return !!this.getAccessToken();
  }

  getAccessToken(): string {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY) || '';
  }

  getRefreshToken(): string {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY) || '';
  }

  refreshAccessToken(): Observable<any> {
    return this.http.get(this._url)
  }
}
