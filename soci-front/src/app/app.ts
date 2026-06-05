import { Component, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('soci-front');

  constructor(private router: Router) {
    // on each navigation end, add a temporary class to body to trigger CSS entry animations
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      document.body.classList.remove('route-enter');
      // force reflow then add class so animation retriggers
      void document.body.offsetWidth;
      document.body.classList.add('route-enter');
      // remove after animation (safe timeout)
      setTimeout(() => document.body.classList.remove('route-enter'), 900);
    });
  }
}
