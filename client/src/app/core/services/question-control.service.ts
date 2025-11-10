import {Injectable} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {QuestionBase} from '../dynamic-form/question-base';
import { debounceTime } from 'rxjs';
import { FormContainer } from '@core/models/question-base';

@Injectable()
export class QuestionControlService {

  toFormGroup(containers: FormContainer[]): FormGroup {
    const questions = this._getQuestionsFromContainer(containers);

    const group: Record<string, AbstractControl> = {};
    questions.forEach((question) => {
      const control = new FormControl(question.value || null, {nonNullable: question.nonNullable})

      if(question.required) {
        control.addValidators(Validators.required)
      }

      if(question.validators.length) {
        control.addValidators(question.validators)
      }

      group[question.key] = control
    });

    questions.forEach(question => {
      group[question.key].valueChanges
             .pipe(
              debounceTime(250)
             )
             .subscribe((value) => {
                  if(question.onValueChange instanceof Function) {
                     question.onValueChange(value, questions)
                  }
             })
    })
    return new FormGroup(group);
  }

  private _getQuestionsFromContainer(containers: FormContainer[]) {
    return containers.reduce((prev: QuestionBase[], curr: FormContainer) => {
      prev.push(...curr.containers)
      return prev
    }, [])
  }
}
