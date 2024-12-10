import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css',
})
export class SignupPageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
}
