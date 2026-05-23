import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TjansterComponent } from './pages/tjanster/tjanster.component';
import { HittaOssComponent } from './pages/hitta-oss/hitta-oss.component';
import { OffertComponent } from './pages/offert/offert.component';
import { KontaktComponent } from './pages/kontakt/kontakt.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tjanster', component: TjansterComponent },
  { path: 'hitta-oss', component: HittaOssComponent },
  { path: 'offert', component: OffertComponent },
  { path: 'kontakt', component: KontaktComponent },
  { path: '**', redirectTo: '' },
];
