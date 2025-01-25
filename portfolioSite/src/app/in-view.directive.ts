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
  @Input('appInView') animationType: 'slide-in' | 'glide-in' | 'grow-in' =
    'slide-in';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    // Set initial styles based on animation type
    if (this.animationType === 'slide-in') {
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
      this.renderer.setStyle(
        this.el.nativeElement,
        'transform',
        'translateX(-50px)'
      ); // Slide in from the left
    } else if (this.animationType === 'glide-in') {
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
      this.renderer.setStyle(
        this.el.nativeElement,
        'transform',
        'translateY(-3rem)'
      ); // Slide in from the top
    } else if (this.animationType === 'grow-in') {
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
      this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(.5)'); // Start at 0 size
    }

    // Add transition for the animation
    this.renderer.setStyle(
      this.el.nativeElement,
      'transition',
      'opacity 750ms ease, transform 750ms ease'
    );

    // Create IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Element is in view, apply animation styles
          this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
          if (
            this.animationType === 'slide-in' ||
            this.animationType === 'glide-in'
          ) {
            this.renderer.setStyle(
              this.el.nativeElement,
              'transform',
              'translateX(0)'
            );
          } else if (this.animationType === 'grow-in') {
            this.renderer.setStyle(
              this.el.nativeElement,
              'transform',
              'scale(1)'
            );
          }
          observer.unobserve(entry.target); // Stop observing once the animation is applied
        }
      },
      { threshold: 0.2 } // Trigger when 15% of the element is visible
    );

    // Start observing the element
    observer.observe(this.el.nativeElement);
  }
}
