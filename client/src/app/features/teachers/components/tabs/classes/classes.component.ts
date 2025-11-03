import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Tag } from "primeng/tag";
import { ButtonModule } from "primeng/button";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'school-classes',
  imports: [Tag, ButtonModule],
  templateUrl: './classes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassesComponent {
  classes = input.required<any>();

  private _router = inject(Router)
  private _activateRouter = inject(ActivatedRoute)

  viewDetail(classObj: any) {
    this._router.navigate([classObj.id], {relativeTo: this._activateRouter})
  }
}
