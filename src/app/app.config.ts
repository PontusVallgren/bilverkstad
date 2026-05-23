import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { LUCIDE_ICONS, LucideIconProvider } from 'lucide-angular';
import {
  Phone, Mail, MapPin, Clock, Facebook,
  ArrowRight, Menu, X, Wrench, Settings, Wind, CircleDot,
  Battery, Gauge, ShieldCheck, LifeBuoy, Car, Send, CheckCircle, CircleCheck, Navigation2,
  FileText, Info, Calendar,
} from 'lucide-angular';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({
        Phone, Mail, MapPin, Clock, Facebook,
        ArrowRight, Menu, X, Wrench, Settings, Wind, CircleDot,
        Battery, Gauge, ShieldCheck, LifeBuoy, Car, Send, CheckCircle, CircleCheck, Navigation2,
        FileText, Info, Calendar,
      }),
    },
  ],
};
