import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { TextInputComponent } from "../../../../shared/components/dynamic-form/text-input/text-input.component";
import { FormsModule } from "@angular/forms";
import { TextareaModule } from 'primeng/textarea';
import { FileUploadModule } from 'primeng/fileupload';
import { TextareaInputComponent } from "../../../../shared/components/dynamic-form/textarea-input/textarea-input.component";
@Component({
  selector: 'school-general',
  imports: [ButtonModule, TextInputComponent, FormsModule, TextareaModule, FileUploadModule, TextareaInputComponent],
  templateUrl: './general.component.html',
  styleUrl: './general.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralComponent {

  resetSettings(): void {
    console.log('Resetting settings...');
    // Reset logic here
  }

  saveGeneralSettings(): void {
    console.log('Saving academic settings...');
    // Save logic here
  }

  uploadLogo(event: any): void {
    console.log('Logo upload:', event);
    // Handle logo upload
  }
}
