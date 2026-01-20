import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InputNumberModule } from "primeng/inputnumber";
import { ButtonModule } from "primeng/button";
import { TextInputComponent, SelectInputComponent, NumberInputComponent } from '@ilhombek/base-form';

@Component({
  selector: 'school-academic',
  imports: [TextInputComponent, SelectInputComponent, InputNumberModule, ButtonModule, NumberInputComponent],
  templateUrl: './academic.component.html',
  styleUrl: './academic.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AcademicComponent {

  gradeSystemOptions = [
    { label: 'GPA (0-4.0)', value: 'gpa' },
    { label: 'Percentage (0-100)', value: 'percentage' },
    { label: 'Letter Grades (A-F)', value: 'letter' }
  ];

  saveAcademicSettings(): void {
    console.log('Saving academic settings...');
    // Save logic here
  }

    resetSettings(): void {
    console.log('Resetting settings...');
    // Reset logic here
  }
}
