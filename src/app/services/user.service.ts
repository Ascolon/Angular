import { Injectable } from '@angular/core';
import { UpdateDataService } from './updateData.service';


@Injectable()
export class UserService {
  constructor() {}

  IsAutorization() {
     return localStorage.getItem('user') !== null;
  }
  setUser(data: {}) {
    localStorage.setItem('user', JSON.stringify(data));
  }
  getUSer() {
    const data = localStorage.getItem('user');
    return JSON.parse(data);
  }
  logout() {
    localStorage.removeItem('user');
    let h = window.history;
  }

}
