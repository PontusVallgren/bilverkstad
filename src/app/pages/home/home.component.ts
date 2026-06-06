import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, ArrowRight, Phone, Wrench, Settings, Wind, CircleDot } from 'lucide-angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent {
  readonly ArrowRight = ArrowRight;
  readonly Phone = Phone;
  readonly Wrench = Wrench;
  readonly Settings = Settings;
  readonly Wind = Wind;
  readonly CircleDot = CircleDot;

  services = [
    {
      title: 'Bilreparationer',
      description: 'Professionella reparationer av de flesta bilmärken. Vi hanterar allt från mindre skador till omfattande reparationer med högsta kvalitet.',
      icon: Wrench,
      image: 'images/service1.jpg',
    },
    {
      title: 'Bilservice',
      description: 'Regelbunden service håller din bil i toppskick. Vi följer tillverkarens serviceprogram och använder kvalitetsdelar.',
      icon: Settings,
      image: 'images/bilservice.jpg',
    },
    {
      title: 'AC-Service',
      description: 'Komplett service av din luftkonditionering. Vi ser till att AC-systemet fungerar optimalt året runt.',
      icon: Wind,
      image: 'images/ac-service.jpg',
    },
    {
      title: 'Hjulinställning',
      description: 'Professionell hjulinställning för jämnt däckslitage och bättre köregenskaper.',
      icon: CircleDot,
      image: 'images/hjulinstallning.jpg',
    },
  ];

  brands = [
    'Audi', 'Citroën', 'VW', 'Peugeot', 'Renault', 'Opel',
    'Volvo', 'Ford', 'Toyota', 'Nissan', 'Hyundai', 'Lexus',
    'Mazda', 'Polestar', 'Skoda', 'Seat',
  ];
}
