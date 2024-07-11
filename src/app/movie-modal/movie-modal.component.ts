import { Component, inject } from '@angular/core';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { MoviesService } from '../movies.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-movie-modal',
  standalone: true,
  templateUrl: './movie-modal.component.html',
  styleUrl: './movie-modal.component.scss',
})
export class MovieModalComponent {
  private readonly dialogData = inject(DIALOG_DATA);
  readonly movie = toSignal(inject(MoviesService).getMovieById(this.dialogData.movieId));
}
