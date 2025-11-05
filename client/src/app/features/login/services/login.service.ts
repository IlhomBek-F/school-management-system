import { Injectable } from "@angular/core";
import { BaseService } from "@core/services/base.service";
import { LoginRequest, LoginResponse } from "../models";
import { Observable } from "rxjs";
import { ResData } from "@core/models/base";

@Injectable({
  providedIn: "root"
})
export class LoginService extends BaseService {
  private url = `${this.baseUrl}/auth/login`;

  login(payload: LoginRequest): Observable<ResData<LoginResponse>> {
    return this.http.post<ResData<LoginResponse>>(this.url, payload)
  }
}
