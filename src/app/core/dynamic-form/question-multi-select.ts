import { QuestionTypeEnum } from '../enums/question-type.enum';
import {QuestionBase} from './question-base';

export class QuestionMultiSelect extends QuestionBase<any> {
  override controlType = QuestionTypeEnum.MultiSelect;
}
