import { ValidatorFn } from "@angular/forms";
import { QuestionFieldTypeEnum, QuestionTypeEnum } from "../enums/question-type.enum";
import { QuestionOptionsModel } from "@core/models/question-base";

export class QuestionBase {
  value: any;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: QuestionTypeEnum;
  type: QuestionFieldTypeEnum;
  validators: ValidatorFn[];
  placeholder: string;
  nonNullable: boolean;
  onValueChange?: (value: any, questions?: QuestionBase[]) => void;

  constructor(
    options: QuestionOptionsModel,
  ) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = (options.controlType || '') as QuestionTypeEnum;
    this.type = (options.type || '') as QuestionFieldTypeEnum;
    this.nonNullable = options.nonNullable || true;
    this.validators = options.validators || [];
    this.placeholder = options.placeholder || ''
    this.onValueChange = options.onValueChange
  }
}
