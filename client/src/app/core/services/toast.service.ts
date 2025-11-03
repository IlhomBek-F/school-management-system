import { inject, Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable({providedIn: 'root'})
export class ToastService {
 private _messageService = inject(MessageService)

 success(message: string) {
   this._messageService.add({ severity: 'success', summary: 'Success', detail: message, closable: false });
 }

 error(message: string) {
   this._messageService.add({ severity: 'error', summary: 'Error', detail: message, closable: false });
 }

 warn(message: string) {
   this._messageService.add({ severity: 'warn', summary: 'Warn', detail: message, closable: false });
 }

 clear() {
   this._messageService.clear()
 }
}
