import { Injectable } from "@angular/core";
import { BaseService } from "@core/services/base.service";

@Injectable({providedIn: "root"})
export class ClassesService extends BaseService{
 protected override baseUrl: string = `${this.apiUrl}/class`;

 getClassTypes() {
  return this.http.get(`${this.apiUrl}/class_type/list`)
 }
}
