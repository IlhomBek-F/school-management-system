import { QuestionTypeEnum } from '../enums/question-type.enum';
import {QuestionBase} from './question-base';

export class QuestionPasswordInput extends QuestionBase {
  override controlType = QuestionTypeEnum.TextInput;
}
