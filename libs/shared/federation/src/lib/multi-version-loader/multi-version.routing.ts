import { Routes } from "@angular/router";
import { multiVersionConfig } from "./multi-version.config";
import { MultiVersionWrapper } from "./multi-version.wrapper";


export function loadMultiVersionMfe(
  remoteName: string,
  exposedModule: string,
  elementName: string
): Routes {
  return [{
    path: '',
    component: MultiVersionWrapper,
    data: multiVersionConfig(remoteName, exposedModule, elementName)
  }];
}
