import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {QuestionBase} from '../dynamic-form/question-base';

@Injectable()
export class QuestionControlService {

  toFormGroup(questions: QuestionBase<string>[]) {
    const group: any = {};
    questions.forEach((question) => {
      const control = new FormControl(question.value || '')

      if(question.required) {
        control.addValidators(Validators.required)
      }

      if(question.validators.length) {
        control.addValidators(question.validators)
      }

      group[question.key] = control
    });
    return new FormGroup(group);
  }
}
