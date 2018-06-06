import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
  pure: true
})
export class OrderPipe implements PipeTransform {
  transform(list: any[], prop: String) {
    return list.sort(function (a, b){
      if (prop === 'id') {
        return b.FilmId - a.FilmId;
      }
      if (prop === 'name') {
        return a.Name > b.Name ? 1 : -1;
      }
      if (prop === 'name_desc') {
        return b.Name > a.Name ? 1 : -1;
      }
      if (prop === 'year') {
        return a.Year - b.Year;
      }
      if (prop === 'year_desc') {
        return b.Year - a.Year;
      }
    });
  }
}
