import { Component, inject } from '@angular/core';
import { InViewDirective } from '../../in-view.directive';
import { CommonModule } from '@angular/common';
import { BannerService } from '../../services/banner.service';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [InViewDirective, CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  animations: [],
})
export class ProjectsComponent {
  private bService = inject(BannerService);
  private http = inject(HttpClient);
  slides: boolean[] = [false, false, false, false];
  isLoadingSPA: boolean = false;
  isLoadingEJS: boolean = false;

  toggleLink(index: number): void {
    this.slides[index] = !this.slides[index];
  }

  toggleLoadingAnimation(sOrE: number): void {
    if (sOrE === 0) this.isLoadingSPA = !this.isLoadingSPA;
    else this.isLoadingEJS = !this.isLoadingEJS;
  }

  openLink(event: Event, url: string, type: number): void {
    this.bService.showBanner('Waking up instance. Just a sec!');
    event.stopPropagation();
    this.toggleLoadingAnimation(type); //0 = SPA

    this.http
      .get(url, { responseType: 'text' })
      .pipe(
        finalize(() => {
          this.toggleLoadingAnimation(type);
        })
      )
      .subscribe({
        next: (res) => {
          this.bService.showBanner('Instance is awake. Redirecting...');
          setTimeout(() => {
            window.location.href = url;
          }, 1000);
        },
        error: (e) => {
          console.log('Error: ', e);
          this.bService.showBanner(
            'There was a problem with the live preview!'
          );
        },
      });
  }
}
