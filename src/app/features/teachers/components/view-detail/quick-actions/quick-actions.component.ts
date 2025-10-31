import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'school-quick-actions',
  imports: [],
  templateUrl: './quick-actions.component.html',
  styles: `:host{
    display: block
  }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickActionsComponent { }
