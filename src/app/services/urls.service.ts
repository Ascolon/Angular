import { Injectable } from '@angular/core';

@Injectable()
export class UrlService {
  constructor() {}

  mainAdress = 'http://ascolon228-001-site1.ftempurl.com';
  getGenres = `${this.mainAdress}/movies/getallgenre`;
  getUpdate = `${this.mainAdress}/movies/getlastadded`;
  getById = `${this.mainAdress}/movies/getmoviebyid/`;
  getByGenres = `${this.mainAdress}/movies/getmoviesbygenre/`;
  getByName = `${this.mainAdress}/movies/getfilmsbyname/`;
  uploadContentByGenre = `${this.mainAdress}/movies/uploadcontentbygenre/`;
  uploadContent = `${this.mainAdress}/movies/uploadcontent/`;
  uploadComments = `${this.mainAdress}/movies/uploadcomments/`;
  addComment = `${this.mainAdress}/movies/addcomment/`;
  addFavorite = `${this.mainAdress}/movies/addtofavorite/`;
  editComment = `${this.mainAdress}/movies/editcomment/`;

  setUserAvatar = `${this.mainAdress}/user/AddToFavorite/`;
  changePassword = `${this.mainAdress}/user/changepassword/`;
  getDefaultAvatar = `${this.mainAdress}/user/getdefaultavatars`;
  login = `${this.mainAdress}/user/autorization/`;
  registration = `${this.mainAdress}/user/registration/`;
  getFavorite = `${this.mainAdress}/user/favorites/`;
  existLogin = `${this.mainAdress}/user/thisnameisbusy/`;

  getallradio = `${this.mainAdress}/Radio/GetAllRadio`;
}
