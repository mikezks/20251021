import { LocationStrategy } from '@angular/common';
import { ENVIRONMENT_INITIALIZER, EnvironmentProviders, inject, InjectionToken, makeEnvironmentProviders, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { ConditionalPopStateLocationStrategy, NoopLocationStrategy } from './location-strategy';


export function provideRouterDisconnect(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: LocationStrategy,
      useFactory: () => inject(NoopLocationStrategy)
    },
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useFactory: (router = inject(Router)) => () => router.initialNavigation()
    }
  ]);
}

export function provideMfeHistoryNavigation(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: LocationStrategy,
      useFactory: () => inject(ConditionalPopStateLocationStrategy)
    }
  ]);
}

export const MfeActive = new InjectionToken<WritableSignal<boolean>>('MfeActive', {
  providedIn: 'root',
  factory: () => signal(false)
});

export const MfeKey = new InjectionToken<WritableSignal<string>>('MfeKey', {
  providedIn: 'root',
  factory: () => signal('')
});

export function provideMfeKey(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useFactory: (mfeKey = inject(MfeKey)) => () => mfeKey.set(
        inject(LocationStrategy).path().split('/')[1]
      )
    }
  ]);
}
