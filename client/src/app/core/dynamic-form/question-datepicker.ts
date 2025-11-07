import { QuestionTypeEnum } from "../enums/question-type.enum";
import { QuestionBase } from "./question-base";

export class QuestionDatePicker extends QuestionBase {
  override controlType = QuestionTypeEnum.DatePicker;
}
