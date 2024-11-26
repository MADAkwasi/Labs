import { Component, Input, OnInit } from '@angular/core';
import { Quiz } from '../data/quiz.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  @Input() subject: Quiz | undefined = undefined;

  ngOnInit(): void {
    console.log(this.subject);
  }
}
