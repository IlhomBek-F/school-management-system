import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { DynamicFormComponent } from '@ilhombek/base-form';
import { TabItem } from '@core/models/base';

@Component({
  selector: 'school-form-tabs',
  imports: [TabsModule, DynamicFormComponent],
  templateUrl: './form-tabs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormTabsComponent {
  tabItems = input.required<TabItem[]>()
  defaultValue = input.required<string>()
}
