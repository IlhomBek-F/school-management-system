import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
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
  teacher = input.required<any>()
  loading = input(false)
}
