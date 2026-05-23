import { Component, signal, HostListener } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, Phone, Menu, X } from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './header.component.html',
  styles: [`
    :host { display: block; }
  `]
})
export class HeaderComponent {
  readonly Phone = Phone;
  readonly Menu = Menu;
  readonly X = X;

  mobileOpen = signal(false);
  scrolled = signal(false);

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 50);
  }

  toggleMenu() {
    this.mobileOpen.update(v => !v);
  }

  navLinks = [
    { label: 'Start', path: '/', exact: true },
    { label: 'Tjänster', path: '/tjanster', exact: false },
    { label: 'Hitta Oss', path: '/hitta-oss', exact: false },
    { label: 'Offert', path: '/offert', exact: false },
    { label: 'Kontakt', path: '/kontakt', exact: false },
  ];
}
