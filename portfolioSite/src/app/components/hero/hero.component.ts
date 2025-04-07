import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InViewDirective } from '../../in-view.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, InViewDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit {
  alternateText: string[] = [
    'Front End Developer',
    'Back End Developer',
    'Full Stack Developer',
  ];
  currentWord: string = ' ';
  isSlidingOut: boolean = true;
  wordIndex: number = 0;
  letterIndex: number = 0;
  isDeleting: boolean = false;

  ngOnInit(): void {
    this.startAnimation();
  }

  startAnimation(): void {
    const typingAnim = setInterval(() => {
      if (this.wordIndex === this.alternateText.length) this.wordIndex = 0;

      if (!this.isDeleting) {
        if (this.letterIndex === this.alternateText[this.wordIndex].length) {
          clearInterval(typingAnim);
          this.isDeleting = true;
          setTimeout(() => this.startAnimation(), 2000);
          return;
        }
        this.currentWord +=
          this.alternateText[this.wordIndex][this.letterIndex];
        this.letterIndex++;
      } else {
        if (this.letterIndex === 0) {
          clearInterval(typingAnim);
          this.isDeleting = false;
          this.wordIndex++;
          this.startAnimation();
          return;
        }
        this.currentWord = this.currentWord.slice(0, -1);
        this.letterIndex--;
      }
    }, 50);
  }

  openResume() {
    window.open('../../../assets/resume/Resume.pdf', '_blank');
  }
}
