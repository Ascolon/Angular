import { Injectable } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Injectable()
export class SubscribeService {

  constructor(private router: Router) { }
  
  subscribeRouter() {
    this.router.events.subscribe( (event) => {
      if(event instanceof NavigationStart){
        console.log(event.url);
      }
    });
  }
}
