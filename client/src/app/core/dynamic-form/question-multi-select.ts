import { QuestionOptionsModel } from '@core/models/question-base';
import { QuestionTypeEnum } from '../enums/question-type.enum';
import {QuestionBase} from './question-base';
import { OptionTypeEnum } from '@core/enums/option-type.enum';

export interface SelectInputOptions extends QuestionOptionsModel{
  loading?: boolean;
  optionLabel?: string;
  optionValue?: string;
  options?: any,
  optionType?: OptionTypeEnum
  normalizeValue?: (value: any) => any
}

export class QuestionMultiSelect extends QuestionBase {
  override controlType = QuestionTypeEnum.MultiSelect;
  loading: boolean;
  optionLabel: string;
  optionValue: string;
  options: any[];
  optionType?: OptionTypeEnum
  normalizeValue?: (value: any) => any

  constructor(options: SelectInputOptions) {
      super(options)
      this.loading = options.loading || false;
      this.optionLabel = options.optionLabel || 'label'
      this.optionValue = options.optionValue || 'value'
      this.options = options.options
      this.optionType = options.optionType || OptionTypeEnum.EAGER
      this.normalizeValue = options.normalizeValue
    }
}
