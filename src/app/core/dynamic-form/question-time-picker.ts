import { QuestionOptionsModel } from "@core/models/question-base";
import { QuestionTypeEnum } from "../enums/question-type.enum";
import { QuestionBase } from "./question-base";

export class QuestionTimePicker extends QuestionBase<any> {
  override controlType = QuestionTypeEnum.TimePicker;
  hourFormat!: string

  constructor(options: QuestionOptionsModel & {
    hourFormat?: string
  }) {
    super(options)
    this.hourFormat = options.hourFormat || '24'
  }
}
