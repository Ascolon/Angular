import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  movies = [];
  noFavorite: Boolean;
  loading: Boolean = false;
  failed: Boolean = false;
  user_id: number;

  constructor(private http: HttpService, private user: UserService) { }
  ngOnInit() {
    this.startLoad();
  }
  startLoad() {
    this.user_id = this.user.getUSer().Id;

    this.loading = true;
    this.failed = false;

    this.http.getFavorite(this.user_id).subscribe(r => {
      for (const movie of r.json()) {
        this.movies.push(movie);
      }
      if (r.json().length === 0) {
        this.noFavorite = true;
      }

    }, (e) => {
      this.loading = false;
      this.failed = true;
    }, () => {
      this.loading = false;
      this.failed = false;
    });
  }
  removeFavorite(id, film) {
    this.http.addfavorite(film.FilmId, this.user.getUSer().Id).subscribe((s) => {
      this.movies.splice(id, 1);
      }, (e) => {

      }, () => {

      });
    }
  }
