import { DatePickerTypeView } from "primeng/datepicker";
import { QuestionTypeEnum } from "../enums/question-type.enum";
import { QuestionBase } from "./question-base";
import { QuestionOptionsModel } from "@core/models/question-base";

export class QuestionDatePicker extends QuestionBase {
  override controlType = QuestionTypeEnum.DatePicker;
  view?: DatePickerTypeView

  constructor(options: QuestionOptionsModel & {view?: DatePickerTypeView}) {
    super(options)
    this.view = options.view || 'date'
  }
}
