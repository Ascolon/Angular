import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnInit {

  constructor(private http: HttpService) { }
  radio = [];
  loading = false;
  failed = false;
  current_station_name: string = 'null'
  current_station_url: string = '';
  ngOnInit() {
    this.startLoad();
  }
  startLoad() {
    this.loading = true;
    this.http.getallradio().subscribe(r => {
      for (const item of r.json()) {
        this.radio.push(item);
      }
    }, e => { this.loading= false; this.failed = true; }, 
    () => { this.loading= false; this.failed = false; });
  }
  playAudio(url, audio) {
    
  }

}
