import { Component, signal } from '@angular/core';
import { Sidebar } from './shared/components/sidebar/sidebar';
import { Topbar } from './shared/components/topbar/topbar';
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('focusflow');
}
