import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let data = new Date(value);
    let data1 = new Date().toUTCString();
    let now = Date.parse(data1);
    var minites = Math.round((+now - +Date.parse(data.toString())) / 1000 / 60) - 300;
    if (minites < 60) {
      return `${minites == 0 ? 1: minites} мин. назад`;
    }
    if(minites > 60 && minites < 1440) {
      var h = minites / 60;
      var m = minites % 60;
      return `${Math.round(h)} часов ${Math.round(m)} мин. назад`;
    }
    if(minites > 1440) {
      var d = minites / 1440;
      return `${Math.round(d)} дней назад`;
    }

  }

}

@Pipe({
  name: 'movietime'
})
export class MovieTimePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    const monthNames = [
      "January", 
      "February", 
      "March", 
      "April",
      "May", 
      "June",
      "July", 
      "August", 
      "September", 
      "October", 
      "November", 
      "December"
    ];
    

  }
}
