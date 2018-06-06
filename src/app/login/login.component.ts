import { HttpService } from './../services/http.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { UpdateDataService } from '../services/updateData.service';
import { FormService } from '../services/form.service';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [],
})
export class LoginComponent implements OnInit  {
  constructor( private http: HttpService,
               private route: Router,
               private user: UserService,
               private dataUpdate: UpdateDataService,
               private formService: FormService  ) {  }

  IsLogin = true;
  IsReg = false;
  loginForm: FormGroup;
  regForm: FormGroup;
  no_user: Boolean = false;
  isBusy = false;

  ngOnInit() {
    this.loginForm = this.formService.formLogin;
    this.regForm = this.formService.formRegistartion;
  }
  login() {
    if (this.loginForm.invalid) {
      console.log('invalid');
      console.log(this.loginForm);
      return;
    }
    const l = this.loginForm.get('loginAuth').value;
    const p = this.loginForm.get('passwordAuth').value;

    this.http.login(l, p).subscribe(r => {
      if (r.json().NotFound) {
        this.no_user = true;
        return;
      }
      if (r.json().hasOwnProperty('Id')) {
        this.user.setUser({
          Id: r.json().Id,
          Name: r.json().Name,
          Avatar: r.json().Avatar,
          LastViewed: r.json().LastViewed
        });
        this.dataUpdate.updateWhenAuthorized();
        this.loginForm.reset();
      }
    }, e => { }, () => { })
  }
  registration() {
    if (this.regForm.invalid || this.isBusy) {
      console.log('invalid');
      console.log(this.regForm);
      return;
    }

    const l = this.regForm.get('loginReg').value;
    const p = this.regForm.get('passwordReg').value;

    this.http
    .registration(l, p)
    .subscribe((s) => {
      if (s.json().Busy === true) {
        console.log('busy');
        return;
      }
      this.user.setUser({
        Id: s.json().Id,
        Name: s.json().Name,
        Avatar: s.json().Avatar
      });
      this.dataUpdate.updateWhenAuthorized();
    }, (e) => {
      console.log(e);
    }, () => { this.regForm.reset(); });
  }

  checkLogiin(login: string) {
    this.http.existLogin(login).subscribe(r => {
      this.isBusy = r.json();
    }, e => {}, () => {});
  }
}

