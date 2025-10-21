import { MultiVersionConfig } from './multi-version.model';


export function multiVersionConfig(
  remoteName: string,
  exposedModule: string,
  elementName: string
): { config: MultiVersionConfig } {
  return { config: { remoteName, exposedModule, elementName }};
}
