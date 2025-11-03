import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkeletonModule } from "primeng/skeleton";

@Component({
  selector: 'school-rooms-grid-view-skeleton',
  imports: [SkeletonModule],
  templateUrl: './rooms-grid-view-skeleton.component.html',
  styles: `:host{
    display: contents
  }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsGridViewSkeletonComponent {}
