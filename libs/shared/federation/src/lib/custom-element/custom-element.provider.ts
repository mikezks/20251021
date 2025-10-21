import { EnvironmentProviders, inject, Injector, makeEnvironmentProviders, provideEnvironmentInitializer, Type } from '@angular/core';
import { createCustomElement } from '@angular/elements';

declare global {
  var mfeBootstrap: Record<string, () => void>;
}


export function provideCustomElement(
  tagname: string,
  component: Type<unknown>
): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideEnvironmentInitializer(
      () => customElements.define(
        tagname,
        createCustomElement(component, { injector: inject(Injector) })
      )
    )
  ]);
}
