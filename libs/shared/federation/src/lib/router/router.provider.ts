import { LocationStrategy } from '@angular/common';
import { EnvironmentProviders, inject, InjectionToken, makeEnvironmentProviders, provideEnvironmentInitializer, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { ConditionalPopStateLocationStrategy, NoopLocationStrategy } from './location-strategy';


export function provideRouterDisconnect(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: LocationStrategy,
      useFactory: () => inject(NoopLocationStrategy)
    },
    provideEnvironmentInitializer(
      () => inject(Router).initialNavigation()
    )
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
    provideEnvironmentInitializer(
      () => inject(MfeKey).set(
        inject(LocationStrategy).path().split('/')[1]
      )
    )
  ]);
}
