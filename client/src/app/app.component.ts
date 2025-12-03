import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from "@shared/components/toast/toast.component";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DeleteConfirmDialogComponent } from "@shared/components/delete-confirm-dialog/delete-confirm-dialog.component";
import { ButtonModule } from 'primeng/button';
import { ThemeEnum, ThemeService } from '@core/services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
            CommonModule,
            ButtonModule,
            ToastComponent,
            ConfirmDialogModule,
            DeleteConfirmDialogComponent,
          ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  private _themeService = inject(ThemeService)
  themeEnum = ThemeEnum;
  theme = signal(ThemeEnum.LIGHT)

  visible = false
  title = 'school-management-crm';

  ngOnInit(): void {
    this.theme.set(this._themeService.themeClass)
  }

  toggle() {
    this._themeService.toggleTheme()
    this.theme.set(this._themeService.themeClass)
  }
}
