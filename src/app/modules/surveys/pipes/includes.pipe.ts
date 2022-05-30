import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'includes'
})
export class IncludesPipe implements PipeTransform {
  transform(value: any, arr: any[] | undefined): boolean {
    if (!arr?.length) return false;
    return arr.includes(value)
  }
}
