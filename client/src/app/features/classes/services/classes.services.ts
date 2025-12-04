import { Injectable } from "@angular/core";
import { BaseService } from "@core/services/base.service";

@Injectable()
export class ClassesService extends BaseService{
 protected override baseUrl: string = `${this.apiUrl}/classes`;
}
