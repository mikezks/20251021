import { DOCUMENT } from "@angular/common";
import { inject, Injectable } from "@angular/core";
import { UrlHandlingStrategy, UrlSerializer, UrlTree } from "@angular/router";
import { MfeKey } from "./router.provider";


@Injectable()
export class MultiRouterHandlingStrategy implements UrlHandlingStrategy {
  private serializer = inject(UrlSerializer);
  private mfeKey = inject(MfeKey);
  private doc = inject(DOCUMENT);
  
  shouldProcessUrl(url: UrlTree): boolean {
    const [, mfeKeyUrl, ...urlSegments] = this.serializer.serialize(url).split('/');
    const isLocalNav = this.mfeKey() ===  mfeKeyUrl;

    if (!isLocalNav) {
      this.doc.dispatchEvent(new CustomEvent(
        'deep-linking-event',
        { detail: {
          route: this.serializer.serialize(url)
        }}
      ));
    }

    return isLocalNav;    
  }

  extract(url: UrlTree): UrlTree {
    return url;
  }
  
  merge(newUrlPart: UrlTree, rawUrl: UrlTree): UrlTree {
    return newUrlPart;
  }
}
