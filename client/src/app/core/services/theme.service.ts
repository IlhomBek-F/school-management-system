import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private key = 'theme';
  private darkClass = 'dark';

  setDarkMode(enable: boolean) {
    if (enable) {
      document.documentElement.classList.add(this.darkClass);
      localStorage.setItem(this.key, 'dark');
    } else {
      document.documentElement.classList.remove(this.darkClass);
      localStorage.setItem(this.key, 'light');
    }
  }

  loadTheme() {
    const saved = localStorage.getItem(this.key);
    this.setDarkMode(saved === 'dark');
  }
}
