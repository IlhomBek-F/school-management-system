import { QuestionTypeEnum } from '../enums/question-type.enum';
import {QuestionBase} from './question-base';

export class QuestionSelectInput extends QuestionBase<string> {
  override controlType = QuestionTypeEnum.SelectInput;
}
