import { loadRemoteModule } from '@angular-architects/native-federation';
import { DOCUMENT } from '@angular/common';
import { Component, inject, ElementRef, input, effect } from '@angular/core';
import { MultiVersionConfig } from './multi-version.model';


@Component({
  selector: 'app-multi-version-wrapper',
  standalone: true,
  template: ''
})
export class MultiVersionWrapper {
  private elmentRef = inject(ElementRef);
  private doc = inject(DOCUMENT);
  config = input.required<MultiVersionConfig>();

  constructor() {
    effect(async () => {
      const { exposedModule, remoteName, elementName } = this.config();
      await loadRemoteModule(remoteName, exposedModule);
      this.elmentRef.nativeElement.appendChild(
        this.doc.createElement(elementName)
      );
    })
  }
}
