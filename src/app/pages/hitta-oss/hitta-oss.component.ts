import { Component } from '@angular/core';
import { LucideAngularModule, MapPin, Phone, Mail, Clock, Car, Navigation2 } from 'lucide-angular';

@Component({
  selector: 'app-hitta-oss',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './hitta-oss.component.html',
  styles: []
})
export class HittaOssComponent {
  readonly MapPin = MapPin;
  readonly Phone = Phone;
  readonly Mail = Mail;
  readonly Clock = Clock;
  readonly Car = Car;
  readonly Navigation2 = Navigation2;
}
