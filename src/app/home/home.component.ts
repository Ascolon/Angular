import { HttpService } from './../services/http.service';
import { Component, OnInit } from '@angular/core';
import { HoveredDirective } from '../directives/hovered.directive';
import { Router } from '@angular/router';
import { movieItemAnimation } from '../animations/app.animation';
import { SettingService } from '../services/setting.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [],
  animations: [
    movieItemAnimation
   ]
})
export class HomeComponent implements OnInit  {

  sort_view: String = 'по умолчанию';
  sort_prop: String = 'id';

  loading: Boolean = true;
  upload: Boolean = false;
  failed: Boolean = false;
  searching = '';
  error_upload: Boolean = false;

  movies = [];
  constructor( private http: HttpService, private route: Router, private setting: SettingService) {  }

  ngOnInit() {
    this.startLoad();
  }



  startLoad() {
    this.failed = false;
    this.loading = true;
    this.http.getLastUpdate().subscribe((s) => {
      for (const movie of s.json()) {
        this.movies.push(movie);
      }
      console.log(s.json());
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
      this.http.uploadMovies(this.movies.length).subscribe( r => {
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
  preloadImage(movie) {
    document.getElementById('preloadImage').setAttribute('src', movie.Pagebg);
    console.log(movie.Pagebg);
  }
  //устанавливает колличество элементов в строке в щависимости от выбора пользователья.
  //приисходит при изменении значения слайдера
  setWidthItem(count) {
    const elements = document.getElementsByClassName('movie-item');
    for (let i = 0; i < elements.length; i++) {
      (<HTMLDivElement>elements[i]).style.width = `${this.setting.setMovieItemWidth(count)}%`;
    }
  }
}
