import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface banner {
  isVisible: boolean;
  message: string;
}
@Injectable({
  providedIn: 'root',
})
export class BannerService {
  private bannerMessageSource = new BehaviorSubject<banner>({
    isVisible: false,
    message: '',
  });

  bannerMessage$ = this.bannerMessageSource.asObservable();
  timeoutId: any;

  showBanner(message: string) {
    if (this.timeoutId) clearTimeout(this.timeoutId);

    this.bannerMessageSource.next({ isVisible: true, message });

    this.timeoutId = setTimeout(() => {
      this.bannerMessageSource.next({ isVisible: false, message: '' });
    }, 3000);
  }
}
