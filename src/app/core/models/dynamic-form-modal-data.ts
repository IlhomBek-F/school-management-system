import { FormContainer } from "./question-base";

export interface DynamicFormModalDataModel {
   formContainers: FormContainer[],
   footer: {
     onConfirm: (formValue: any) => void;
     onCancel: VoidFunction
   }
}
