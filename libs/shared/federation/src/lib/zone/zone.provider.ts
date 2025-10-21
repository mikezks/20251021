import { EnvironmentProviders, inject, makeEnvironmentProviders, NgZone, provideEnvironmentInitializer } from '@angular/core';

declare global {
  var ngZone: NgZone;
}


export function provideZoneSharing(): EnvironmentProviders {
  return makeEnvironmentProviders([
    globalThis.ngZone
      ? { provide: NgZone, useValue: globalThis.ngZone }
      : [],
    provideEnvironmentInitializer(
      () => globalThis.ngZone = globalThis.ngZone
        ? globalThis.ngZone
        : inject(NgZone)
    )
  ]);
}
