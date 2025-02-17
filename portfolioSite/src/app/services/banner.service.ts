import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  private bannerMessageSource = new BehaviorSubject<boolean>(false);
  bannerMessage$ = this.bannerMessageSource.asObservable();

  showBanner() {
    this.bannerMessageSource.next(true);

    setTimeout(() => {
      this.bannerMessageSource.next(false);
    }, 3000);
  }
}
