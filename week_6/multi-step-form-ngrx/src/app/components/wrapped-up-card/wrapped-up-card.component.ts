import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wrapped-up-card',
  standalone: true,
  imports: [],
  templateUrl: './wrapped-up-card.component.html',
  styleUrl: './wrapped-up-card.component.css',
})
export class WrappedUpCardComponent implements OnInit {
  private readonly router = inject(Router);
  ngOnInit(): void {
    setTimeout(() => this.router.navigateByUrl('/'), 3000);
  }
}
