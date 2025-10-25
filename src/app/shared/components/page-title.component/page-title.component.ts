import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'school-page-title',
  imports: [CommonModule],
  template: `
    <div class="mb-8">
          <h1 [class]="'text-4xl font-bold text-gray-800 mb-2 ' + className()">{{title()}}</h1>

          @if(subTitle()) {
            <p className="text-gray-600">{{subTitle()}}</p>
          }
    </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTitleComponent {
  title = input.required()
  subTitle = input()
  className = input("")
}
