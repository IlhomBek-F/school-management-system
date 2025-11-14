import { Injectable } from "@angular/core";
import { BaseService } from "@core/services/base.service";

@Injectable()
export class StudentsService extends BaseService {
 protected override baseUrl = `/${this.apiUrl}/students`
}
