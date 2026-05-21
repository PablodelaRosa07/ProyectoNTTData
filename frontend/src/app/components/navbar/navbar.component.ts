import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <nav class="navbar">
      <div class="navbar-brand">
        <span class="brand-icon">🎬</span>
        <span class="brand-name">VideoClub<span class="brand-accent">VC</span></span>
      </div>
      <div class="navbar-links" [class.open]="menuOpen()">
        <a routerLink="/peliculas" routerLinkActive="active" (click)="menuOpen.set(false)">
          <span class="nav-icon">🎞</span> Películas
        </a>
        <a routerLink="/alquileres" routerLinkActive="active" (click)="menuOpen.set(false)">
          <span class="nav-icon">📋</span> Alquileres
        </a>
        <a routerLink="/peliculas/nueva" class="btn-nueva" (click)="menuOpen.set(false)">
          + Nueva Película
        </a>
      </div>
      <button class="menu-toggle" (click)="menuOpen.set(!menuOpen())">
        {{ menuOpen() ? '✕' : '☰' }}
      </button>
    </nav>
  `,
  styles: [`
    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 2rem;
      height: 72px;
      background: #0a0a0a;
      border-bottom: 1px solid rgba(229, 160, 13, 0.3);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .navbar-brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
      cursor: pointer;
    }
    .brand-icon { font-size: 1.8rem; }
    .brand-name {
      font-family: 'Bebas Neue', 'Impact', sans-serif;
      font-size: 1.8rem;
      color: #f5f5f0;
      letter-spacing: 2px;
    }
    .brand-accent { color: #e5a00d; }
    .navbar-links {
      display: flex;
      align-items: center;
      gap: 2rem;
    }
    .navbar-links a {
      color: #a0a0a0;
      text-decoration: none;
      font-size: 0.95rem;
      font-weight: 500;
      letter-spacing: 0.5px;
      transition: color 0.2s;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
    .navbar-links a:hover,
    .navbar-links a.active {
      color: #e5a00d;
    }
    .btn-nueva {
      background: #e5a00d !important;
      color: #0a0a0a !important;
      padding: 0.5rem 1.2rem;
      border-radius: 6px;
      font-weight: 700 !important;
      transition: background 0.2s !important;
    }
    .btn-nueva:hover { background: #f0b429 !important; }
    .menu-toggle {
      display: none;
      background: none;
      border: none;
      color: #f5f5f0;
      font-size: 1.5rem;
      cursor: pointer;
    }
    @media (max-width: 768px) {
      .menu-toggle { display: block; }
      .navbar-links {
        display: none;
        position: absolute;
        top: 72px;
        left: 0;
        right: 0;
        background: #0a0a0a;
        flex-direction: column;
        padding: 1rem 2rem;
        border-bottom: 1px solid rgba(229,160,13,0.3);
        gap: 1rem;
      }
      .navbar-links.open { display: flex; }
    }
  `]
})
export class NavbarComponent {
  menuOpen = signal(false);
}
