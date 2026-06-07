import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-angular';
import { MailService } from '../../services/mail.service';

@Component({
  selector: 'app-kontakt',
  standalone: true,
  imports: [FormsModule, LucideAngularModule],
  templateUrl: './kontakt.component.html',
  styles: []
})
export class KontaktComponent {
  readonly Phone = Phone;
  readonly Mail = Mail;
  readonly MapPin = MapPin;
  readonly Clock = Clock;
  readonly Send = Send;
  readonly CheckCircle = CheckCircle;

  private readonly mailService = inject(MailService);

  submitted = signal(false);
  sending = signal(false);
  error = signal<string | null>(null);

  form = {
    name: '',
    email: '',
    phone: '',
    message: '',
    company: '', // honeypot — must stay empty
  };

  onSubmit() {
    if (this.sending()) {
      return;
    }
    this.sending.set(true);
    this.error.set(null);

    this.mailService.sendContact(this.form).subscribe({
      next: () => {
        this.sending.set(false);
        this.submitted.set(true);
      },
      error: () => {
        this.sending.set(false);
        this.error.set('Något gick fel. Försök igen eller ring oss på 0910-100 16.');
      },
    });
  }
}
