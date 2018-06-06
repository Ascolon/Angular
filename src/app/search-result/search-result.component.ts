import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  movies= [];
  name: string= '';

  constructor(private route: ActivatedRoute, private http: HttpService) { }
  
  ngOnInit() {
    this.name = this.route.snapshot.params['name'];
    this.startLoad();
  }
  startLoad() {
    this.http.getFilmBysName(this.name).subscribe(r => {
      this.movies = [];
      for (const movie of r.json()) {
        this.movies.push(movie);
      }
      console.log(r.json());
    }, e => {}, () => {});
  }
}

