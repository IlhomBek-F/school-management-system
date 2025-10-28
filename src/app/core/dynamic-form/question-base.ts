import { ValidatorFn } from "@angular/forms";
import { QuestionFieldTypeEnum, QuestionTypeEnum } from "../enums/question-type.enum";
import { FormContainer } from "../models/form-container";

export class QuestionBase<T> {
  value: T | undefined;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: QuestionTypeEnum;
  type: QuestionFieldTypeEnum;
  options: {value: string; label: string}[];
  validators: ValidatorFn[];
  placeholder: string;
  onValueChange?: (value: any, questions?: QuestionBase<T>[]) => void;

  constructor(
    options: {
      value?: T;
      key?: string;
      label?: string;
      required?: boolean;
      order?: number;
      controlType?: QuestionTypeEnum;
      type?: QuestionFieldTypeEnum;
      placeholder?: string;
      options?: {value: string; label: string}[];
      validators?: ValidatorFn[],
      onValueChange?: (value: any, questions?: QuestionBase<T>[]) => void
    } = {},
  ) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = (options.controlType || '') as QuestionTypeEnum;
    this.type = (options.type || '') as QuestionFieldTypeEnum;
    this.options = options.options || [];
    this.validators = options.validators || [];
    this.placeholder = options.placeholder || ''
    this.onValueChange = options.onValueChange
  }
}
