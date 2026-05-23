import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Phone, Mail, MapPin, Clock, Send, CheckCircle, CircleCheck } from 'lucide-angular';

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
  readonly CircleCheck = CircleCheck;

  submitted = signal(false);

  form = {
    name: '',
    email: '',
    phone: '',
    message: '',
  };

  onSubmit() {
    this.submitted.set(true);
  }
}
