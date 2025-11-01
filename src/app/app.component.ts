import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from "@shared/components/toast/toast.component";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DeleteConfirmDialogComponent } from "@shared/components/delete-confirm-dialog/delete-confirm-dialog.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, ToastComponent, ConfirmDialogModule, DeleteConfirmDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  visible = false
  title = 'school-management-crm';
}
