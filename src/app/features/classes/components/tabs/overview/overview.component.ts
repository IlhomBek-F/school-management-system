import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DividerModule } from "primeng/divider";
import { ChipModule } from "primeng/chip";
import { TableModule } from "primeng/table";
import { CommonModule } from '@angular/common';
import { SkeletonModule } from "primeng/skeleton";

@Component({
  selector: 'school-overview',
  imports: [DividerModule, ChipModule, TableModule, CommonModule, SkeletonModule],
  templateUrl: './overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  classData = input.required<any>()
  schedule = input.required<any>()
  loading = input(false)

}
