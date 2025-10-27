import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TextInputComponent } from "../../../../shared/components/text-input/text-input.component";
import { SelectInputComponent } from "../../../../shared/components/select-input/select-input.component";
import { InputNumberModule } from "primeng/inputnumber";
import { ButtonModule } from "primeng/button";

@Component({
  selector: 'school-academic',
  imports: [TextInputComponent, SelectInputComponent, InputNumberModule, ButtonModule],
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
