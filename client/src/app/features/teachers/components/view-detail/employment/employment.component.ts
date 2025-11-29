import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TagModule } from "primeng/tag";
import { SkeletonModule } from "primeng/skeleton";
import { CommonModule } from '@angular/common';
import { Teacher } from 'app/features/teachers/models';
import { DEPARTMENTS_MAP } from 'app/utils/constants';

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
  teacher = input.required<Teacher>()
  loading = input(false)
  DEPARTMENTS_MAP = DEPARTMENTS_MAP
}
