import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TagModule } from "primeng/tag";
import { Button } from "primeng/button";
import { ClassesGridViewSkeletonComponent } from "../classes-grid-view-skeleton/classes-grid-view-skeleton.component";
import { ClassModel } from '../../models';
import { RandomBgColorPipe } from "@core/pipes/random-bg-color-pipe";
import { GRADES_MAP } from 'app/utils/constants';

@Component({
  selector: 'school-classes-grid-view-list',
  imports: [TagModule, CommonModule, Button, ClassesGridViewSkeletonComponent, RandomBgColorPipe],
  templateUrl: './classes-grid-view-list.component.html',
  styleUrl: './classes-grid-view-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassesGridViewListComponent {
  classList = input.required<ClassModel[]>()
  editEmitEvent = output<any>()
  viewDetailEmitEvent = output<any>()
  deleteEmitEvent = output<any>()
  loading = input(false)
  GRADE_MAP = GRADES_MAP

  viewDetails(cls: any): void {
    this.viewDetailEmitEvent.emit(cls)
  }

  editClass(classObj: any): void {
    this.editEmitEvent.emit(classObj)
  }

  deleteClass(classObj: any): void {
    this.deleteEmitEvent.emit(classObj)
  }

}
