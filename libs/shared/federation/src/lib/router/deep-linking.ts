import { DOCUMENT, EnvironmentProviders, inject, makeEnvironmentProviders, provideAppInitializer } from "@angular/core";
import { Router, UrlHandlingStrategy } from "@angular/router";
import { MultiRouterHandlingStrategy } from "./url-handling";


export function provideDeeplinkingSender(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: UrlHandlingStrategy,
      useClass: MultiRouterHandlingStrategy
    },
  ]);
}

export function provideDeeplinkingListener(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideAppInitializer((
      router = inject(Router),
      doc = inject(DOCUMENT)
    ) => {
      doc.addEventListener(
        'deep-linking-event',
        ev => {
          const route = (ev as CustomEvent)?.detail?.route;
          if (route) {
            router.navigateByUrl(route);
          }
        }
      );
    })
  ])
}