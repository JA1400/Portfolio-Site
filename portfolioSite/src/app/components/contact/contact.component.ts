import { Component, OnInit } from '@angular/core';
import { InViewDirective } from '../../in-view.directive';
import {
  Validators,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import emailjs from '@emailjs/browser';
import { trigger, style, transition, animate } from '@angular/animations';
import { BannerComponent } from '../banner/banner.component';
import { BannerService } from '../../services/banner.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    InViewDirective,
    ReactiveFormsModule,
    CommonModule,
    BannerComponent,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms ease-in-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('150ms ease-in-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class ContactComponent implements OnInit {
  formData = { from_name: '', reply_to: '', message: '' };
  contactForm!: FormGroup;
  disabledBtn: boolean = false;
  serviceID = 'service_29ja6py';
  templateID = 'template_1xmh58k';
  publicKey = '126VAtvBzcMUK_BsS';

  constructor(private fb: FormBuilder, private bService: BannerService) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      from_name: ['', [Validators.required, Validators.minLength(3)]],
      reply_to: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  shouldShowPopup(field: string): boolean | undefined {
    const control = this.contactForm.get(field);
    return control?.invalid && control?.touched!;
  }

  sendEmail() {
    if (this.contactForm.invalid) {
      // Mark all fields as touched to show validation messages
      this.contactForm.markAllAsTouched();
      return;
    }

    this.disabledBtn = true;

    emailjs
      .send(
        this.serviceID,
        this.templateID,
        this.contactForm.value,
        this.publicKey
      )
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
        },
        (error) => {
          console.error('FAILED...', error);
        }
      )
      .finally(() => {
        this.bService.showBanner('Message sent successfully!');
        this.contactForm.reset();
        this.disabledBtn = false;
      });
  }
}
