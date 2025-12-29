import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TagModule } from "primeng/tag";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { ClassPayload } from '../../models';
import { GRADES_MAP } from 'app/utils/constants';

@Component({
  selector: 'school-classes-table-view-list',
  imports: [TagModule, ButtonModule, TableModule],
  templateUrl: './classes-table-view-list.component.html',
  styleUrl: './classes-table-view-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassesTableViewListComponent {
  classesList = input.required<ClassPayload[]>()
  editEmitEvent = output<any>()
  viewDetailEmitEvent = output<any>()
  deleteEmitEvent = output<any>()
  GRADES_MAP = GRADES_MAP;

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
