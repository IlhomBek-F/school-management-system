import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PRIMENG_PROVIDER } from '../../primeng.config';
import { ToastService } from '@core/services/toast.service';
import { BaseService } from '@core/services/base.service';
import { authInteceptor } from '@core/interceptors/auth';


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
    provideHttpClient(withInterceptors([authInteceptor])),
    provideRouter(routes, withInMemoryScrolling({scrollPositionRestoration: "top"}))]
};


