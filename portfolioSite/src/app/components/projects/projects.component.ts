import { Component, HostListener } from '@angular/core';
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
  projectsArr: boolean[] = [false, false, false];
  testArr: number[] = [0, 1, 2];
  constructor() {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const containsTrue = this.projectsArr.includes(true);
    if (!containsTrue) {
      return;
    }
    const width = event.target ? event.target.innerWidth : event; // Handle direct calls or events
    if (width >= 768) {
      this.projectsArr.fill(false);
    }
  }

  toggleText(index: number): void {
    this.projectsArr[index] = !this.projectsArr[index];
  }
}
