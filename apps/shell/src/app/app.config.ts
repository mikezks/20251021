import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideZoneSharing } from '@flight-demo/shared/federation';
import { provideRouterFeature } from '@flight-demo/shared/state';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { APP_ROUTES } from './app.routes';
import { provideMfeConfig } from './mfe.config';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideZoneSharing(),
    provideRouter(APP_ROUTES,
      withComponentInputBinding(),
    ),
    provideHttpClient(),
    provideStore(),
    provideEffects(),
    provideRouterFeature(),
    provideStoreDevtools(),
    provideMfeConfig('./mfe.config.json'),
  ]
};
