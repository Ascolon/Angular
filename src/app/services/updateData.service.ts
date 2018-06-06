import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class UpdateDataService {
  constructor(private user: UserService) {}

  // Observablev Subject
  app_current_user_avatar = new BehaviorSubject<string>('');
  app_user_authorized = new BehaviorSubject<Boolean>(false);
  app_show_favorite = new BehaviorSubject<Boolean>(false);
  app_IsAutentification = new BehaviorSubject<Boolean>(false);
  film_current_user_avatar = new BehaviorSubject<string>('');
  film_showElseNeedLoginForCommentBlock = new BehaviorSubject<Boolean>(true);

  updateWhenAuthorized() {
    console.log('user_authorized');
    this.app_current_user_avatar.next(this.user.getUSer().Avatar);
    this.app_user_authorized.next(true);
    this.app_show_favorite.next(true);
    this.app_IsAutentification.next(false);
    this.film_current_user_avatar.next(this.user.getUSer().Avatar);
    this.film_showElseNeedLoginForCommentBlock.next(false);
  }

  updateWhenLogout() {
    console.log('user_logout');
    this.app_user_authorized.next(false);
    this.app_show_favorite.next(false);
    this.film_showElseNeedLoginForCommentBlock.next(true);
  }
}
