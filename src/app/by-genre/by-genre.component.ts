import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Route } from '@angular/router';
import { HttpService } from './../services/http.service';
import { HoveredDirective } from '../directives/hovered.directive';
import { Router } from '@angular/router';
import { movieItemAnimation } from '../animations/app.animation';


@Component({
  selector: 'app-by-genre',
  templateUrl: './by-genre.component.html',
  styleUrls: ['./by-genre.component.css']
})
export class ByGenreComponent implements OnInit {

  sort_view: String = 'по умолчанию';
  sort_prop: String = 'id';

  loading: Boolean = true;
  upload: Boolean = false;
  failed: Boolean = false;
  searching = '';
  genre: String;
  movies: any[];
  error_upload = false;


  constructor(private route: Router, private activatedRoute: ActivatedRoute, private http: HttpService) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.genre = params['genre'];
      // if (params.scroll === undefined) {
      //   console.log(JSON.parse(JSON.stringify(params)).hasOwnProperty('wwre'));
      // }
      this.startLoad();
    });
  }
  startLoad() {

    this.failed = false;
    this.loading = true;
    this.http.getFilmsByGenre(this.genre).subscribe((s) => {
      this.movies = [];
      for (const movie of s.json()) {
        this.movies.push(movie);
      }
    }, (e) => {
      this.loading = false;
      this.failed = true;
    }, () => {
      this.loading = false;
      this.failed = false;
    });
  }
  setSortParam(prop: String, view: String) {
    this.sort_prop = prop;
    this.sort_view = view;
  }
  uploadItems(event) {
    const height = (<HTMLDivElement>event.target).scrollHeight - (<HTMLDivElement>event.target).offsetHeight;
    const scroll = (<HTMLDivElement>event.target).scrollTop;
    if ((scroll === height) && (!this.upload)) {
      this.upload = true;
      this.http.uploadMoviesByGenre(this.movies.length, this.genre).subscribe( r => {
        for (const movie of r.json()) {
          this.movies.push(movie);
        }
      }, e => {
        this.upload = false;
        this.error_upload = true;
        setTimeout(() => { this.error_upload = false; }, 1500);
      }, () => {
        this.upload = false;
      });
    }
  }
  isSelected(prop) {
    return this.sort_view  === prop;
  }

}
