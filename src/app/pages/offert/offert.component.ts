import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Send, CheckCircle, FileText, Info, Calendar } from 'lucide-angular';
import { MailService } from '../../services/mail.service';

@Component({
  selector: 'app-offert',
  standalone: true,
  imports: [FormsModule, LucideAngularModule],
  templateUrl: './offert.component.html',
  styles: []
})
export class OffertComponent {
  readonly Send = Send;
  readonly CheckCircle = CheckCircle;
  readonly FileText = FileText;
  readonly Info = Info;
  readonly Calendar = Calendar;

  private readonly mailService = inject(MailService);

  submitted = signal(false);
  sending = signal(false);
  error = signal<string | null>(null);

  form = {
    regNumber: '',
    name: '',
    phone: '',
    email: '',
    service: '',
    priority: '',
    date: '',
    message: '',
    company: '', // honeypot — must stay empty
  };

  services = [
    'Bilservice',
    'Bilreparation',
    'AC-Service',
    'Hjulinställning',
    'Batteribyte',
    'Diagnostik',
    'Besiktningsförberedelse',
    'Annat',
  ];

  priorities = [
    'Normalt ärende',
    'Brådskande',
  ];

  onSubmit() {
    if (this.sending()) {
      return;
    }
    this.sending.set(true);
    this.error.set(null);

    this.mailService.sendOffert(this.form).subscribe({
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
