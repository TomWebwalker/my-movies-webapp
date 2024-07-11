import { Component, inject, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GenreService } from '../genre.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-movies-search-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './movies-search-form.component.html',
  styleUrl: './movies-search-form.component.scss',
})
export class MoviesSearchFormComponent {
  readonly genresList = toSignal(
    inject(GenreService)
      .getGenres()
      .pipe(map((data) => data.data)),
  );
  readonly search = output<{ genre: string; search: string }>();
  readonly form = new FormGroup({
    genre: new FormControl(''),
    search: new FormControl(''),
  });

  formSubmitHandler() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    const { search, genre } = this.form.value;
    this.search.emit({
      search: search || '',
      genre: genre || '',
    });
  }
}
