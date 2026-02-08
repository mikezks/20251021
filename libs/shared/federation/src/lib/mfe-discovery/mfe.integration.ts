import { loadRemoteModule } from "@angular-architects/module-federation";
import { UrlMatcher, UrlSegment, defaultUrlMatcher, Route } from "@angular/router";
import { fullMatchFirstSegment, loadMultiVersionMfe } from "@flight-demo/shared/federation";
import { mfeConfig } from "./mfe.config";


export function matchSegment(segment: string): UrlMatcher {
  return (segments: UrlSegment[], group, route) =>
    mfeConfig()[segment].integrationMode === 'single'
      ? defaultUrlMatcher(segments, group, { path: segment })
      : fullMatchFirstSegment(segment)(segments, group, route);
}

export function loadMfe(remoteName: string) {
  return () => mfeConfig()[remoteName].integrationMode === 'single'
    ? loadRemoteModule(remoteName, './routes')
    : loadMultiVersionMfe(
      remoteName + '-multi',
      './bootstrap',
      'mfe-' + remoteName
    );
}

export function integrateMfe(mfeName: string): Route {
  return {
    matcher: matchSegment(mfeName),
    loadChildren: loadMfe(mfeName)
  };
}
