import { QuestionOptionsModel } from '@core/models/question-base';
import { QuestionTypeEnum } from '../enums/question-type.enum';
import {QuestionBase} from './question-base';

export interface SelectInputOptions extends QuestionOptionsModel{
  loading?: boolean;
  optionLabel?: string;
  optionValue?: string;
  options?: any,
  normalizeValue?: (value: any) => any
}

export class QuestionSelectInput extends QuestionBase {
  override controlType = QuestionTypeEnum.SelectInput;
  loading: boolean;
  optionLabel: string;
  optionValue: string;
  options: any[];
  normalizeValue?: <T = any>(value: any) => T

  constructor(options: SelectInputOptions) {
    super(options)
    this.loading = options.loading || false;
    this.optionLabel = options.optionLabel || 'label'
    this.optionValue = options.optionValue || 'value'
    this.options = options.options
    this.normalizeValue = options.normalizeValue
  }
}
