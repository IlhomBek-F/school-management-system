import { Injectable } from "@angular/core";
import { BaseService } from "@core/services/base.service";

@Injectable()
export class StudentsService extends BaseService {
  override baseUrl = `${this.apiUrl}/student`
}
