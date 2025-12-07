import { EnvironmentProviders, makeEnvironmentProviders, Type } from "@angular/core";
import { provideCustomElement } from "../custom-element/custom-element.provider";
import { provideMfeHistoryNavigation, provideMfeKey } from "../router/router.provider";
import { provideZoneSharing } from "../zone/zone.provider";
import { provideMfeConfig } from "../mfe-discovery/mfe.config";
import { provideDeeplinkingListener, provideDeeplinkingSender } from "../router/deep-linking";


export function provideMfeShell(
  url: string
): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideZoneSharing(),
    provideMfeConfig(url),
    provideDeeplinkingListener(),
  ]);
}

export function provideMultiVersionMfe(
  tagname: string,
  component: Type<unknown>
): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideZoneSharing(),
    provideCustomElement(tagname, component),
    provideMfeHistoryNavigation(),
    provideMfeKey(),
    provideDeeplinkingSender()
  ]);
}