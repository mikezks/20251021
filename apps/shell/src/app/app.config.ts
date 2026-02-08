import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideMfeShell } from '@flight-demo/shared/federation';
import { provideRouterFeature } from '@flight-demo/shared/state';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { APP_ROUTES } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(APP_ROUTES,
      withComponentInputBinding(),
    ),
    provideHttpClient(),
    provideStore(),
    provideEffects(),
    provideRouterFeature(),
    provideStoreDevtools(),
    provideMfeShell('./mfe.config.json'),
  ]
};
