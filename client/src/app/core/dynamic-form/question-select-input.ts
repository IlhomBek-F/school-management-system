import { QuestionOptionsModel } from '@core/models/question-base';
import { QuestionTypeEnum } from '../enums/question-type.enum';
import {QuestionBase} from './question-base';

export interface SelectInputOptions extends QuestionOptionsModel{
  loading?: boolean;
  optionLabel?: string;
  optionValue?: string;
  options?: any
}

export class QuestionSelectInput extends QuestionBase {
  override controlType = QuestionTypeEnum.SelectInput;
  loading: boolean;
  optionLabel: string;
  optionValue: string;
  options: any[];

  constructor(options: SelectInputOptions) {
    super(options)
    this.loading = options.loading || false;
    this.optionLabel = options.optionLabel || 'label'
    this.optionValue = options.value || 'value'
    this.options = options.options
  }
}
