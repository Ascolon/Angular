import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from './http.service';

@Injectable()
export class FormService {

  constructor(private http: HttpService) { }
  formLogin = new FormGroup({
    'loginAuth': new FormControl(null, [
      Validators.required
    ]),
    'passwordAuth': new FormControl(null, [
      Validators.required
    ])
  });

  formRegistartion = new FormGroup({
    'loginReg': new FormControl(null, [
      Validators.required,
      this.forbiddenValidator
    ]),
    'passwordReg': new FormControl(null, [
      Validators.minLength(6),
      Validators.required
    ])
  });

  forbiddenValidator(control: FormControl) { 
    let login = control.value as string;
    if (login && login.length > 0) {
      if (login.match(/^[0-9]|[^A-Z0-9]/gi) !== null) {
        return {
          forbidden: true
        }
      }
    } 
    return null;
  }

  existLogin(control: FormControl) {
    let login = control.value as string;
    if (login && login.length > 0 && this.http !== null) {
      this.http.existLogin(login).subscribe(r => {
        if (r.json()) {
          return {
            isBusy : true
          }
        }
      }, e => {}, () => {});
    } 
    return null;
  }
}
