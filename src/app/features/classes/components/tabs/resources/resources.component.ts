import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";

@Component({
  selector: 'school-resources',
  imports: [CardModule, ButtonModule],
  templateUrl: './resources.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcesComponent {
  resources = input.required<any[]>()

  onDownloadResource(resource: any): void {
    console.log('Download resource:', resource);
  }
}
