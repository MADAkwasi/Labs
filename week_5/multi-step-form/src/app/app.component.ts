import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StorageService } from './storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [StorageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
