import { UrlMatcher, UrlSegment } from "@angular/router";


export function matchSegments(
  path: string,
  segmentStart: number,
  segmentEnd: number,
  fullMatch: boolean
): UrlMatcher  {
  const pathSegments = path.split('/');

  return (segments: UrlSegment[]) =>
    Array.from(
      { length: segmentEnd - segmentStart },
      (_, idx) => idx + segmentStart
    ).reduce((acc, cur) => acc && (
      (cur === segmentStart && pathSegments[cur - segmentStart] === '')
      || segments[cur]?.path === pathSegments[cur - segmentStart]
    ), true)
      ? fullMatch
        ? { consumed: segments }
        : { consumed: segments.slice(0, segmentEnd) }
      : { consumed: [] };
}

export function fullMatchFirstSegment(path: string): UrlMatcher {
  return matchSegments(path, 0, 1, true);
}

export function partialMatchFirstSegment(path: string): UrlMatcher {
  return matchSegments(path, 0, 1, false);
}

export function partialMatchSecondSegment(path: string): UrlMatcher {
  return matchSegments(path, 1, 2, false);
}
