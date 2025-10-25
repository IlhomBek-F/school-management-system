import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'school-empty-list',
  template: `
    <div class="bg-white rounded-xl shadow-sm p-12 text-center">
      <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <i class="pi pi-search text-gray-400 text-3xl"></i>
      </div>
      <h3 class="text-xl font-semibold text-gray-800 mb-2">{{title()}}</h3>
      <p class="text-gray-600">{{subTitle()}}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyListComponent {
  title = input.required()
  subTitle = input('Try adjusting your search or filter criteria')
}
