import { AsyncOptionEnum } from "@core/enums/async-option.enum"
import { OptionTypeEnum } from "@core/enums/option-type.enum"
import { DropdownOption } from "@core/models/base"
import { catchError, finalize, of, tap, throwError } from "rxjs"

export const makeDropdownOption = (label: string, value: string | number): DropdownOption => ({ label, value })

export function handleAsyncOption(this: any) {
  if (this.optionType() === OptionTypeEnum.EAGER) {
    this._options = this.options();
    return of(this.options())
  }

  this.loading = true;
  return this._asyncOptionService.getAsyncOptionsRequest(this.asyncOptionType() as AsyncOptionEnum)
    .pipe(
      tap((data) => this._options = data),
      finalize(() => this.loading = false),
      catchError((err) => {
        this._messageService.error(`Failed fetching async ${this.label()} options`)
        return throwError(() => err)
      })
    )
}
