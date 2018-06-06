import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  pure: false
})
export class SearchPipe implements PipeTransform {
  transform(a: any[], s:String) {
    return a.filter(e => {
      return e.Name.toLowerCase().includes(s.toLowerCase());
    });
  }
}
