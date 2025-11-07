import { QuestionOptionsModel } from "@core/models/question-base";
import { QuestionTypeEnum } from "../enums/question-type.enum";
import { QuestionBase } from "./question-base";

interface TimePickerOptions extends QuestionOptionsModel{
  hourFormat?: string
}

export class QuestionTimePicker extends QuestionBase {
  override controlType = QuestionTypeEnum.TimePicker;
  hourFormat!: string

  constructor(options: TimePickerOptions) {
    super(options)
    this.hourFormat = options.hourFormat || '24'
  }
}
