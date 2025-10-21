import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MfeRouterNavigation } from '@flight-demo/shared/federation';


@Component({
  selector: 'app-root',
  imports: [
    RouterLink, RouterOutlet
  ],
  hostDirectives: [MfeRouterNavigation],
  template: `
    <ul>
      <li>
        <a routerLink="tickets/overview">Overview</a>
      </li>
      <li>
        <a routerLink="tickets/detail/3">Detail</a>
      </li>
    </ul>

    <router-outlet />
  `,
  styles: `
    a {
      &:link, &:visited, &:active {
        color: darkblue;
      }
    }
  `
})
export class App {
  protected readonly title = signal('miles');
}

export default App;
