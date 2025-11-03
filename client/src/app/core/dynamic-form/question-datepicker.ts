import { QuestionTypeEnum } from "../enums/question-type.enum";
import { QuestionBase } from "./question-base";

export class QuestionDatePicker extends QuestionBase<any> {
  override controlType = QuestionTypeEnum.DatePicker;
}
