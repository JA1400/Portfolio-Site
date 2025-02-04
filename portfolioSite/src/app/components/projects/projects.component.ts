import { Component } from '@angular/core';
import { InViewDirective } from '../../in-view.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [InViewDirective, CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  animations: [],
})
export class ProjectsComponent {
  constructor() {}
  slides: boolean[] = [false, false, false, false];

  toggleLink(index: number): void {
    this.slides[index] = !this.slides[index];
  }
}
