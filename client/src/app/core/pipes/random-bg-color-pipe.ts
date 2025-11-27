import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'schoolRandomBgColor',
})
export class RandomBgColorPipe implements PipeTransform {

  transform(length: number, index: number): unknown {
    return ['bg-pink-500',
            'bg-blue-500',
            'bg-green-500',
            'bg-purple-500',
            'bg-orange-500',
            'bg-indigo-500',
            'bg-red-500',
            'bg-teal-500'
          ][(length - 1 - index) % 3]
  }
}
