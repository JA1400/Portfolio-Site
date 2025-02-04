import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  menuToggle: boolean = false;
  activeSection: string = 'home';

  ngOnInit() {
    const sections = document.querySelectorAll(
      'app-hero, app-about, app-projects, app-contact'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);
        if (visibleSection) {
          this.activeSection = visibleSection.target.id;
        }
      },
      { threshold: 0.2 }
    );

    sections.forEach((section) => observer.observe(section));
  }
  toggleMenu(): void {
    this.menuToggle = !this.menuToggle;
  }
}
