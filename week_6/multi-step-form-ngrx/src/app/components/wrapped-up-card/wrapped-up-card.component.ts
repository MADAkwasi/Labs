import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wrapped-up-card',
  standalone: true,
  imports: [],
  templateUrl: './wrapped-up-card.component.html',
  styleUrl: './wrapped-up-card.component.css',
})
export class WrappedUpCardComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => this.router.navigateByUrl('/'), 3000);
  }
}
