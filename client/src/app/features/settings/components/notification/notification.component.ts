import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'school-notification',
  imports: [ButtonModule, InputTextModule, DropdownModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent {

  saveNotificationSettings(): void {
    console.log('Saving notification settings...');
    // Save logic here
  }

   resetSettings(): void {
    console.log('Resetting settings...');
    // Reset logic here
  }
}
