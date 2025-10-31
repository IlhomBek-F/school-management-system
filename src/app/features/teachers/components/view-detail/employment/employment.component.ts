import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TagModule } from "primeng/tag";
import { SkeletonModule } from "primeng/skeleton";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'school-employment',
  imports: [TagModule, SkeletonModule, CommonModule],
  templateUrl: './employment.component.html',
   styles: `:host{
    display: block
  }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmploymentComponent {
  teacher = input.required<any>()
  loading = input(false)
}
