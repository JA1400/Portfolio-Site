import { Component } from '@angular/core';
import { InViewDirective } from '../../in-view.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [InViewDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {}
