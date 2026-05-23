import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Send, CheckCircle, FileText, Info, Calendar } from 'lucide-angular';

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

  submitted = signal(false);

  form = {
    regNumber: '',
    name: '',
    phone: '',
    email: '',
    service: '',
    priority: '',
    date: '',
    message: '',
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
    this.submitted.set(true);
  }
}
