import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PRIMENG_PROVIDER } from '../../primeng.config';
import { ToastService } from '@core/services/toast.service';
import { BaseService } from '@core/services/base.service';


const PUBLIC_SERVICES = [
    BaseService,
    DialogService,
    MessageService,
    ToastService,
    ConfirmationService
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


