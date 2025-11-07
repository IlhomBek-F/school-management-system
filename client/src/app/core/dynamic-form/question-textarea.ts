import { QuestionTypeEnum } from '../enums/question-type.enum';
import {QuestionBase} from './question-base';

export class QuestionTextArea extends QuestionBase {
  override controlType = QuestionTypeEnum.TextArea;
}
