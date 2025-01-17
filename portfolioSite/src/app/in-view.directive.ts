import {
  Directive,
  ElementRef,
  Renderer2,
  AfterViewInit,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appInView]',
  standalone: true,
})
export class InViewDirective implements AfterViewInit {
  @Input('appInView') animationType: 'slide-in' | 'glide-in' = 'slide-in';
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    // Set initial styles
    if (this.animationType === 'slide-in') {
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
      this.renderer.setStyle(
        this.el.nativeElement,
        'transform',
        'translateX(-50px)' // Slide in from the left
      );
    } else if (this.animationType === 'glide-in') {
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
      this.renderer.setStyle(
        this.el.nativeElement,
        'transform',
        'translateY(-3rem)' // Shrink slightly for pop-in effect
      );
    }

    this.renderer.setStyle(
      this.el.nativeElement,
      'transition',
      'opacity 750ms ease, transform 750ms ease'
    );

    // Create IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Element is in view, apply styles for fade-in animation
          this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
          this.renderer.setStyle(
            this.el.nativeElement,
            'transform',
            'translateX(0)'
          );
          observer.unobserve(entry.target); // Stop observing once the animation is applied
        }
      },
      { threshold: 0.15 } // Trigger when 10% of the element is visible
    );

    // Start observing the element
    observer.observe(this.el.nativeElement);
  }
}
