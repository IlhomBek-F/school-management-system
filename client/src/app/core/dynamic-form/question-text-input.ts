import { QuestionTypeEnum } from '../enums/question-type.enum';
import {QuestionBase} from './question-base';

export class QuestionTextInput extends QuestionBase<string> {
  override controlType = QuestionTypeEnum.TextInput;
}
