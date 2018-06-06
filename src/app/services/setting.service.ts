import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class SettingService {

  showTooltip = new BehaviorSubject<Boolean>(true);
  constructor(private userService: UserService) { }

  setTrayValue(value: string) {
    localStorage.setItem('saveTray', value);
  }
  getTrayValue(): boolean {
    return localStorage.getItem('saveTray') === 'false'
    || localStorage.getItem('saveTray') === null ? false : true;
  }

  setTooltipValue(value: string) {
    localStorage.setItem('saveTooltip', value);
  }
  getTooltipValue(): boolean {
    return localStorage.getItem('saveTooltip') === 'false' ||
    localStorage.getItem('saveTooltip') === null ? false : true;
  }
  setLasViewedMovie(data) {
    // localStorage.setItem('lastViewed', JSON.stringify(data));
    var user = this.userService.getUSer();
    user.LastViewed = data;
    this.userService.setUser(user);
  }
  getLasViewedMovie() {
    if (!this.userService.IsAutorization()) {
      return;
    }
    var last = JSON.parse(localStorage.getItem('user')).LastViewed;
    if (!last) {
      return false;
    }
    return last;
  }

  setMovieItemWidth(countInRow: number) {
    return 100 / countInRow;
}

}
