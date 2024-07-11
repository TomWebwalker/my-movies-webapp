import { Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  readonly posterSrc = input<string>();
  readonly movieTitle = input<string>();
  readonly movieRating = input<string>();
}
