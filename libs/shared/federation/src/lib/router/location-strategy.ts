import { LocationChangeEvent, LocationChangeListener, PathLocationStrategy } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { MfeActive } from './router.provider';


@Injectable({
  providedIn: 'root'
})
export class NoopLocationStrategy extends PathLocationStrategy {
  override onPopState(): void {}
  override pushState(): void {}
  override replaceState(): void {}
}

@Injectable({
  providedIn: 'root'
})
export class ConditionalPopStateLocationStrategy extends PathLocationStrategy {
  private mfeActive = inject(MfeActive).asReadonly();

  override pushState(state: any, title: string, url: string, queryParams: string): void {
    if (this.path().split('/').length < 3) {
      super.replaceState(state, title, url, queryParams);
    } else {
      super.pushState(state, title, url, queryParams);
    }
  }

  override onPopState(fn: LocationChangeListener): void {
    super.onPopState((event: LocationChangeEvent) => {
      if (this.mfeActive()) {
        fn(event);
      }
    });
  }
}
