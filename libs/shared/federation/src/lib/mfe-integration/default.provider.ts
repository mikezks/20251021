import { EnvironmentProviders, makeEnvironmentProviders, Type } from "@angular/core";
import { provideCustomElement } from "../custom-element/custom-element.provider";
import { provideMfeHistoryNavigation, provideMfeKey } from "../router/router.provider";
import { provideZoneSharing } from "../zone/zone.provider";


export function provideMultiVersionMfe(
  tagname: string,
  component: Type<unknown>
): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideZoneSharing(),
    provideCustomElement(tagname, component),
    provideMfeHistoryNavigation(),
    provideMfeKey()
  ]);
}