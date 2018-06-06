import { HttpService } from './services/http.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlService } from './services/urls.service';
import { UserService } from './services/user.service';
import { UpdateDataService } from './services/updateData.service';
import { SettingService } from './services/setting.service';
import { SubscribeService } from './services/subscribe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {

  current_user_avatar: String;
  showTooltip: Boolean = true;
  show_favorite: Boolean = false;
  user_authorized: Boolean = false;
  loading: Boolean = true;
  IsAutentification: Boolean = false;
  genres = [];
  constructor( private http: HttpService,
               private user: UserService,
               private route: Router,
               private updateData: UpdateDataService, 
               private setting: SettingService,
               private subscribe: SubscribeService) {  }

  ngOnInit() {
    if (this.user.IsAutorization()) {
      this.updateData.updateWhenAuthorized();
    }
    this.initSubscribe();
    // this.subscribe.subscribeRouter();
    this.showTooltip = this.setting.getTooltipValue();
    this.startLoad();
  }
  startLoad() {

    this.loading = true;
    this.http.getGenres().subscribe((s) => {
      for (const genre of s.json()) {
        this.genres.push(genre);
      }
    }, (e) => {
      this.startLoad();
    }, () => {
      this.loading = false;
    });
  }
  open_cp() {
    if (!this.user.IsAutorization()) {
      this.IsAutentification = true;
      return;
    }
    this.route.navigateByUrl('cp');
  }
  initSubscribe() {
    this.updateData.app_current_user_avatar.subscribe( data => { this.current_user_avatar = data; });
    this.updateData.app_user_authorized.subscribe( data => { this.user_authorized = data; });
    this.updateData.app_show_favorite.subscribe( data => { this.show_favorite = data; });
    this.updateData.app_IsAutentification.subscribe( data => { this.IsAutentification = data; });
    this.setting.showTooltip.subscribe(data => { this.showTooltip = data; });   
  }
  ifHasHistory() {
    return window.history.length > 0 && this.route.url !== '/';
  }
  slideBack() {
    window.history.back();
  }
}
