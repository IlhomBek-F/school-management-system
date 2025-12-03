import { Injectable } from '@angular/core';

export enum ThemeEnum {
  LIGHT = 'p-light',
  DARK = 'p-dark'
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private key = 'theme';
  themeClass: ThemeEnum = ThemeEnum.LIGHT;

  toggleTheme() {
      document.documentElement.classList.remove(this.themeClass);
      this.themeClass = this.themeClass === ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK;
      document.documentElement.classList.add(this.themeClass);
      localStorage.setItem(this.key, ThemeEnum.DARK);
  }

  loadTheme() {
    const saved = localStorage.getItem(this.key) || ThemeEnum.LIGHT;
    this.themeClass = saved as ThemeEnum
    this.toggleTheme();
  }
}
