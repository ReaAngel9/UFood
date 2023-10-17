import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myUpperCase',
})
export class MyUpperCasePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return value.replace(value.charAt(0), value.charAt(0).toUpperCase());
  }
}
