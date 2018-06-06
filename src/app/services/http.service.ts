import { UrlService } from './urls.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()
export class HttpService {
  constructor(private http: Http, private urls: UrlService) {}

  getGenres() {
    return this.http.get(this.urls.getGenres);
  }
  getLastUpdate() {
    return this.http.get(this.urls.getUpdate);
  }
  getFilmById(id: number, user: number) {
    return this.http.get(`${this.urls.getById}?f_id=${id}&u_id=${user}`);  // int f_id, int u_id
  }
  getFilmBysName(name: String) {
    return this.http.get(`${this.urls.getByName}?n=${name}`);
  }
  getFilmsByGenre(genre: String) {
    return this.http.get(`${this.urls.getByGenres}?g=${genre}`);
  }
  setUserAvatar(path: String, id: number) {
    return this.http.get(`${this.urls.setUserAvatar}?avatar=${path}&user=${id}`);  // string avatar, int user
  }
  login(l: String, p: String) {
    return this.http.get(`${this.urls.login}?l=${l}&p=${p}`);
  }
  registration(l: String, p: String) {
    return this.http.get(`${this.urls.registration}?l=${l}&p=${p}`);
  }
  addfavorite(film: number, user: number) {
    return this.http.get(`${this.urls.addFavorite}?f_id=${film}&u_id=${user}`);
  }
  addComment(film: number, text: String, user: number) {
     // http://joycasino-001-site1.ftempurl.com/movies/addcomment/?f=435&t=wdawdawd&u=10
     return this.http.get(`${this.urls.addComment}?f=${film}&t=${text}&u=${user}`);
  }
  uploadMoviesByGenre(s: number, g: String) {
    return this.http.get(`${this.urls.uploadContentByGenre}?s=${s}&g=${g}`);
  }
  uploadMovies(s: number) {
    return this.http.get(`${this.urls.uploadContent}?s=${s}`);
  }
  getFavorite(id: number) {
    return this.http.get(`${this.urls.getFavorite}?id=${id}`);
  }
  uploadComment(s: number, f: number) {
    return this.http.get(`${this.urls.uploadComments}?s=${s}&f_id=${f}`);
  }
  editComment(id: number, text: string) {
    return this.http.get(`${this.urls.editComment}?c_id=${id}&text=${text}`);
  }
  changePassword(pass, user) {
    return this.http.get(`${this.urls.changePassword}?u_id=${user}&new_pass=${pass}`);
  }
  existLogin(login: string) {
    return this.http.get(`${this.urls.existLogin}?login=${login}`);
  }
  getallradio() {
    return this.http.get(`${this.urls.getallradio}`);
  }

}
