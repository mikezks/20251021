import { LocationStrategy } from '@angular/common';
import { inject, DestroyRef, Directive } from '@angular/core';
import { Router } from '@angular/router';
import { MfeActive, MfeKey } from './router.provider';


export function injectNavigationOnDestroy(url = ''): void {
  const router = inject(Router);
  inject(DestroyRef).onDestroy(
    () => router.navigateByUrl(url)
  );
}

export function injectInitialRouterNavigation(): (popState?: boolean) => void {
  const router = inject(Router);
  const location = inject(LocationStrategy);
  const mfeKey = inject(MfeKey);

  return (popState = false) => (
    !popState
    || location.path().split('/').length > 2
  ) && mfeKey() === location.path().split('/')[1]
  && router.navigateByUrl(location.path());
}

@Directive({
  standalone: true
})
export class MfeRouterNavigation {
  constructor() {
    const mfeActive = inject(MfeActive)
    mfeActive.set(true);
    inject(DestroyRef).onDestroy(() => mfeActive.set(false));
    const nav = injectInitialRouterNavigation();
    nav();
    inject(LocationStrategy).onPopState(() => nav(true));
  }
}
