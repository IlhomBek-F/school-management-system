import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { PRIMENG_PROVIDER } from '../../primeng.config';
import { ToastService } from '@core/services/toast.service';


const PUBLIC_SERVICES = [
    DialogService,
    MessageService,
    ToastService
]

export const appConfig: ApplicationConfig = {
  providers: [
    PRIMENG_PROVIDER,
    PUBLIC_SERVICES,
    provideAnimationsAsync(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes)]
};


