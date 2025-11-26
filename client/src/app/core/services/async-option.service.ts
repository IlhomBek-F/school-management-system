import { inject, Injectable } from "@angular/core";
import { AsyncOptionEnum } from "@core/enums/async-option.enum";
import { ResDataWithMeta } from "@core/models/base";
import { Subject } from "@core/models/subject";
import { map, Observable } from "rxjs";
import { SubjectsService } from "./subjects.service";

@Injectable({providedIn: "root"})
export class AsyncOptionsService {
  private _subjectsService = inject(SubjectsService)
  getAsyncOptionsRequest(asyncType: AsyncOptionEnum): Observable<any> {
      switch (asyncType) {
      case AsyncOptionEnum.SUBJECTS:
        return this._subjectsService.retrieveAll<ResDataWithMeta<Subject[]>>().pipe(this._pickData());

      default:
        throw new Error(`Unknown AsyncOptionEnum: ${asyncType}`);
    }
  }

 private _pickData<T>() {
    return map((res: ResDataWithMeta<T>) => res.data)
  }
}
