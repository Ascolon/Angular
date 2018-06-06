import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHovered]'
})
export class HoveredDirective {
  @HostBinding('class.hovered') IsHovered = false;

  @HostListener('mouseover') OnMouseEnter() {
    this.IsHovered = true;
  }

  @HostListener('mouseleave') OnMouseLeave() {
    this.IsHovered = false;
  }
}
