import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Wrench, Settings, Wind, CircleDot, ArrowRight, CircleCheck } from 'lucide-angular';

@Component({
  selector: 'app-tjanster',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './tjanster.component.html',
  styles: []
})
export class TjansterComponent {
  readonly ArrowRight = ArrowRight;
  readonly CircleCheck = CircleCheck;

  services = [
    {
      icon: Wrench,
      iconGradient: 'from-red-500 to-orange-500',
      title: 'Bilreparationer',
      description: 'Professionella reparationer av de flesta bilmärken. Vi hanterar allt från mindre skador till omfattande reparationer med högsta kvalitet.',
      image: 'images/service1.jpg',
    },
    {
      icon: Settings,
      iconGradient: 'from-violet-500 to-purple-600',
      title: 'Bilservice',
      description: 'Regelbunden service håller din bil i toppskick. Vi följer tillverkarens serviceprogram och använder kvalitetsdelar.',
      image: 'images/bilservice.jpg',
    },
    {
      icon: Wind,
      iconGradient: 'from-blue-500 to-violet-500',
      title: 'AC-Service',
      description: 'Komplett service av din luftkonditionering. Vi ser till att AC-systemet fungerar optimalt året runt.',
      image: 'images/ac-service.jpg',
    },
    {
      icon: CircleDot,
      iconGradient: 'from-violet-600 to-pink-500',
      title: 'Hjulinställning',
      description: 'Professionell hjulinställning för jämnt däckslitage och bättre köregenskaper.',
      image: 'images/hjulinstallning.jpg',
    },
  ];

  generalServices = [
    'Periodisk service enligt tillverkarens rekommendationer',
    'Motordiagnostik och felsökning',
    'Bromssystem service och reparation',
    'Avgassystem kontroll och reparation',
    'Kamremsbyte och motorservice',
  ];

  specialistServices = [
    'AC-service och klimatanläggning – Komplett service',
    'Hjulinställning – För bättre köregenskaper',
    'Däckbyte och balansering',
    'Eldiagnostik och elektronik',
    'Besiktningsförberedelse',
  ];

  brands = [
    'Audi', 'Citroën', 'VW', 'Peugeot', 'Renault', 'Opel',
    'Volvo', 'Ford', 'Toyota', 'Nissan', 'Hyundai', 'Lexus',
    'Mazda', 'Polestar', 'Skoda', 'Seat',
  ];
}
