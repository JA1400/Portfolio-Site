import { Component } from '@angular/core';
import { InViewDirective } from '../../in-view.directive';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [InViewDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {}
