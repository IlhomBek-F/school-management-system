import { ValidatorFn } from "@angular/forms";
import { QuestionTypeEnum } from "../enums/question-type.enum";

export class QuestionBase<T> {
  value: T | undefined;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: QuestionTypeEnum;
  type: string;
  options: {value: string; label: string}[];
  validators: ValidatorFn[]
  constructor(
    options: {
      value?: T;
      key?: string;
      label?: string;
      required?: boolean;
      order?: number;
      controlType?: QuestionTypeEnum;
      type?: string;
      options?: {value: string; label: string}[];
      validators?: ValidatorFn[]
    } = {},
  ) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = (options.controlType || '') as QuestionTypeEnum;
    this.type = options.type || '';
    this.options = options.options || [];
    this.validators = options.validators || []
  }
}
