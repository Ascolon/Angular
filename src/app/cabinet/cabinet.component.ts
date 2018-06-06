import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UpdateDataService } from '../services/updateData.service';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import { SettingService } from '../services/setting.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.css'],
  providers: [],
})
export class CabinetComponent implements OnInit {

  userName: string;
  urlAvatar: string;
  IsCnahgePassword: boolean = false;
  constructor(private user: UserService, private router : Router, private setting: SettingService,
              private data: UpdateDataService, private http: HttpService) { }

  ngOnInit() {
    this.userName = this.user.getUSer().Name;
    this.urlAvatar = this.user.getUSer().Avatar;
  }
  logout() {
    this.user.logout();
    this.data.updateWhenLogout();
    window.history.back();
  }
  changePassword(pass) {
    this.http.changePassword(pass, this.user.getUSer().Id).subscribe(r => {
      this.IsCnahgePassword = false;
    }, e => {}, () => {});
  }
  continueLastViewed() {
    const last = this.setting.getLasViewedMovie();
    this.router.navigate( ['../film', last.film, last.time ]);
  }
}
