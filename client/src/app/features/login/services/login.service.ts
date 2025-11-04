import { Injectable } from "@angular/core";
import { BaseService } from "@core/services/base.service";

@Injectable({
  providedIn: "root"
})
export class LoginService extends BaseService {
  private url = `${this.baseUrl}/auth/login`;

  login() {
    return this.http.post(this.url, {username: "admin", password: 'admin1234'})
  }
}
