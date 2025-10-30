import { ValidatorFn } from "@angular/forms";
import { QuestionBase } from "@core/dynamic-form/question-base";
import { QuestionFieldTypeEnum, QuestionTypeEnum } from "@core/enums/question-type.enum";

export interface QuestionOptionsModel<T = any> {
  value?: T;
  key: string;
  label?: string;
  required?: boolean;
  order?: number;
  controlType?: QuestionTypeEnum;
  type?: QuestionFieldTypeEnum;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validators?: ValidatorFn[],
  onValueChange?: (value: any, questions?: QuestionBase<T>[]) => void
}
