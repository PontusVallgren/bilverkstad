import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Phone, Mail, MapPin, Clock, Facebook } from 'lucide-angular';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './footer.component.html',
  styles: []
})
export class FooterComponent {
  readonly Phone = Phone;
  readonly Mail = Mail;
  readonly MapPin = MapPin;
  readonly Clock = Clock;
  readonly Facebook = Facebook;

  quickLinks = [
    { label: 'Start', path: '/' },
    { label: 'Tjänster', path: '/tjanster' },
    { label: 'Hitta Oss', path: '/hitta-oss' },
    { label: 'Begär Offert', path: '/offert' },
    { label: 'Kontakt', path: '/kontakt' },
  ];
}
