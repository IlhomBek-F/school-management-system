import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'schoolRandomBgColor',
})
export class RandomBgColorPipe implements PipeTransform {

  transform(length: number, index: number): unknown {
    return ['bg-blue-500', 'bg-green-500', 'bg-purple-500'][(length - 1 - index) % 3]
  }
}
