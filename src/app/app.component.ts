import { Component } from '@angular/core';
import { MainModule } from './main-module/main-module';

@Component({
  selector: 'app-root',
  imports: [MainModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Contact-book';
}
