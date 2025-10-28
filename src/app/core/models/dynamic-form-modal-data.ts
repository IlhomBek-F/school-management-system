import { FormContainer } from "./form-container";

export interface DynamicFormModalDataModel {
   formContainers: FormContainer[],
   footer: {
     onConfirm: (formValue: any) => void;
     onCancel: VoidFunction
   }
}
