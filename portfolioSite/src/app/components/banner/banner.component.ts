import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BannerService } from '../../services/banner.service';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
  animations: [
    trigger('bannerAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100%)' }), // Start off-screen to the right
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateX(0)' })
        ), // Slide in
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ opacity: 0, transform: 'translateX(100%)' })
        ), // Slide out
      ]),
    ]),
  ],
})
export class BannerComponent {
  isVisible: boolean = false;
  message: string = '';

  constructor(private bService: BannerService) {
    this.bService.bannerMessage$.subscribe((state) => {
      this.message = state.message;
      this.isVisible = state.isVisible;
    });
  }
}
