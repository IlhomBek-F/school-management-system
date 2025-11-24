import { ChangeDetectionStrategy, Component, computed, inject, input, output, signal } from '@angular/core';
import { TagModule } from "primeng/tag";
import { ButtonModule } from "primeng/button";
import { StudentViewDetailStatusCardsComponent } from "../student-view-detail-status-cards/student-view-detail-status-cards.component";
import { SkeletonModule } from "primeng/skeleton";
import { CommonModule } from '@angular/common';
import { Student } from 'app/features/students/models';
import { CLASS_SECTION_MAP, CLASS_SECTIONS, GRADES, GRADES_MAP } from 'app/utils/constants';

@Component({
  selector: 'school-student-view-detail-header',
  imports: [TagModule, ButtonModule, StudentViewDetailStatusCardsComponent, SkeletonModule, CommonModule],
  templateUrl: './student-view-detail-header.component.html',
  styleUrl: './student-view-detail-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentViewDetailHeaderComponent {
  student = input.required<Student>()
  loading = input(false)
  studentUpdatedEmit = output()

  GRADES_MAP = GRADES_MAP;
  CLASS_SECTION_MAP = CLASS_SECTION_MAP;

  downloadReport(): void {
    console.log('Download report');
  }

  sendMessage(): void {
    console.log('Send message');
  }
}
