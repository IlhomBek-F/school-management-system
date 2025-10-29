import { QuestionTypeEnum } from '../enums/question-type.enum';
import {QuestionBase} from './question-base';

export class QuestionTextArea extends QuestionBase<any> {
  override controlType = QuestionTypeEnum.TextArea;
}
