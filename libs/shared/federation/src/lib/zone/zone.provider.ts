import { ENVIRONMENT_INITIALIZER, EnvironmentProviders, inject, makeEnvironmentProviders, NgZone } from '@angular/core';

declare global {
  var ngZone: NgZone;
}


export function provideZoneSharing(): EnvironmentProviders {
  return makeEnvironmentProviders([
    globalThis.ngZone
      ? { provide: NgZone, useValue: globalThis.ngZone }
      : [],
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useFactory: (zone = inject(NgZone)) => () => globalThis.ngZone = globalThis.ngZone
        ? globalThis.ngZone
        : zone
    }
  ]);
}
