import { trigger, state, animate, style, transition } from '@angular/animations';


export const movieItemAnimation = trigger('createItem', [
  transition(':enter', [
    style({
      transform: 'scale(0.8)'
    }),
    animate(400, style({
      transform: 'scale(1)'
    }))
  ])
]);

export const topItemAnimation = trigger('topItem', [
  transition(':enter', [
    style({
      top: '0px'
    }),
    animate(300, style({
      top: '50px'
    }))
  ])
]);
