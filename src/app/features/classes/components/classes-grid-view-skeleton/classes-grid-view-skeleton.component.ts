import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkeletonModule } from "primeng/skeleton";

@Component({
  selector: 'school-classes-grid-view-skeleton',
  imports: [SkeletonModule],
  templateUrl: './classes-grid-view-skeleton.component.html',
  styles: `:host {
    display: contents
  }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassesGridViewSkeletonComponent { }
