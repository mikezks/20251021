import { APP_INITIALIZER, EnvironmentProviders, inject, makeEnvironmentProviders } from "@angular/core";
import { Router, UrlHandlingStrategy } from "@angular/router";
import { MultiRouterHandlingStrategy } from "./url-handling";
import { DOCUMENT } from "@angular/common";


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
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (
        router = inject(Router),
        doc = inject(DOCUMENT)
      ) => () => {
        doc.addEventListener(
          'deep-linking-event',
          ev => {
            const route = (ev as CustomEvent)?.detail?.route;
            if (route) {
              router.navigateByUrl(route);
            }
          }
        );
      }
    }
  ])
}