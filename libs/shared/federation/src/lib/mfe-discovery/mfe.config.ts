import { HttpClient } from "@angular/common/http";
import { APP_INITIALIZER, EnvironmentProviders, inject, makeEnvironmentProviders, signal } from "@angular/core";
import { tap } from "rxjs";

export type MfeConfig = Record<string, {
  integrationMode: 'single' | 'multi' | 'iframe'
}>;

export const mfeConfig = signal<MfeConfig>({});

export function provideMfeConfig(url: string): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (http = inject(HttpClient)) => () => http
        .get<MfeConfig>(url).pipe(
          tap(cfg => mfeConfig.set(cfg))
        )
    }
  ]);
}