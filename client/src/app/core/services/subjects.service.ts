import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";

@Injectable({providedIn: 'root'})
export class SubjectsService extends BaseService {
  protected override baseUrl = `${this.apiUrl}/subject`
}
