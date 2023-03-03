import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div id="app">
        <router-outlet></router-outlet>
        <main>
        </main>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'clientmanagement';
}
