import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SelectInputComponent } from "../../../../shared/components/select-input/select-input.component";
import { ButtonModule } from "primeng/button";

@Component({
  selector: 'school-appearance',
  imports: [SelectInputComponent, ButtonModule],
  templateUrl: './appearance.component.html',
  styleUrl: './appearance.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppearanceComponent {

   dateFormatOptions = [
    { label: 'MM/DD/YYYY', value: 'MM/DD/YYYY' },
    { label: 'DD/MM/YYYY', value: 'DD/MM/YYYY' },
    { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' }
  ];

   languageOptions = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' }
  ];

  themeOptions = [
    { label: 'Light Mode', value: 'light' },
    { label: 'Dark Mode', value: 'dark' },
    { label: 'Auto', value: 'auto' }
  ];

   saveAppearanceSettings(): void {
    console.log('Saving appearance settings...');
    // Save logic here
  }
}
