import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  langService = inject(LanguageService);

  name = signal<string>('');
  mobile = signal<string>('');
  email = signal<string>('');
  subject = signal<string>('Plant Inquiry / Order Support');
  message = signal<string>('');
  isSubmitted = signal<boolean>(false);

  onSubmit(): void {
    if (!this.name() || !this.mobile()) {
      alert('Please provide your name and phone number so our nursery team can assist you.');
      return;
    }
    this.isSubmitted.set(true);
  }

  getWhatsAppChatUrl(): string {
    const text = encodeURIComponent(
      `Vanakkam Babu Organic Garden!\nName: ${this.name() || 'Plant Enthusiast'}\nSubject: ${this.subject()}\nMessage: ${this.message() || 'I would like to inquire about organic plants and garden supplies.'}`
    );
    return `https://api.whatsapp.com/send?text=${text}`;
  }

  resetForm(): void {
    this.name.set('');
    this.mobile.set('');
    this.email.set('');
    this.message.set('');
    this.isSubmitted.set(false);
  }
}
