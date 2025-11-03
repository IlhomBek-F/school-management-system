import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SkeletonModule } from "primeng/skeleton";

@Component({
  selector: 'school-top-students',
  imports: [CommonModule, SkeletonModule],
  templateUrl: './top-students.component.html',
  styleUrl: './top-students.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopStudentsComponent {
  students = input.required<any[]>();
  loading = input(false);

}
