import { QuestionOptionsModel } from '@core/models/question-base';
import { QuestionTypeEnum } from '../enums/question-type.enum';
import {QuestionBase} from './question-base';
import { OptionTypeEnum } from '@core/enums/option-type.enum';
import { AsyncOptionEnum } from '@core/enums/async-option.enum';

interface SelectInputOptionsAsync extends SelectInputOptionsBase {
  optionType: OptionTypeEnum.ASYNC;
  asyncOptionType: AsyncOptionEnum;
}

interface SelectInputOptionsEager extends SelectInputOptionsBase {
  optionType?: OptionTypeEnum.EAGER;
  asyncOptionType?: never;
}

interface SelectInputOptionsBase extends QuestionOptionsModel{
  loading?: boolean;
  optionLabel?: string;
  optionValue?: string;
  options?: any,
  optionType?: OptionTypeEnum;
  asyncOptionType?: any;
  normalizeValue?: (options: any, value: any) => any
}

export type SelectInputOptions = SelectInputOptionsAsync | SelectInputOptionsEager;

export class QuestionSelectInput extends QuestionBase {
  override controlType = QuestionTypeEnum.SelectInput;
  optionLabel: string;
  optionValue: string;
  options: any[];
  optionType?: OptionTypeEnum;
  asyncOptionType?: AsyncOptionEnum;
  normalizeValue?: <T = any>(value: any, options?: any) => T

  constructor(options: SelectInputOptions) {
    super(options)
    this.optionLabel = options.optionLabel || 'label'
    this.optionValue = options.optionValue || 'value'
    this.options = options.options
    this.optionType = options.optionType || OptionTypeEnum.EAGER
    if(this.optionType === OptionTypeEnum.ASYNC) {
      this.asyncOptionType = options.asyncOptionType
    }
    this.normalizeValue = options.normalizeValue
  }
}
