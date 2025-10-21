import { HttpClient } from "@angular/common/http";
import { EnvironmentProviders, inject, provideAppInitializer, signal } from "@angular/core";
import { tap } from "rxjs";

export type MfeConfig = Record<string, {
  integrationMode: 'single' | 'multi' | 'iframe'
}>;

export const mfeConfig = signal<MfeConfig>({});

export function provideMfeConfig(url: string): EnvironmentProviders {
  return provideAppInitializer(() => inject(HttpClient)
    .get<MfeConfig>(url).pipe(
      tap(cfg => mfeConfig.set(cfg))
    )
  );
}