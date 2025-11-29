import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Subject } from '@core/models/subject';
import { SkeletonModule } from "primeng/skeleton";

@Component({
  selector: 'school-subjects',
  imports: [SkeletonModule, CommonModule],
  templateUrl: './subjects.component.html',
  styles: `:host{
    display: block
  }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubjectsComponent {
  subjects = input.required<Subject[]>()
  loading = input(false)


}
