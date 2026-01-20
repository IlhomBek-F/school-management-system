import { FormContainer } from "@ilhombek/base-form";

export interface DynamicFormModalDataModel {
   formContainers: FormContainer[],
   footer: {
     onConfirm: (formValue: any) => void;
     onCancel: VoidFunction
   }
}
