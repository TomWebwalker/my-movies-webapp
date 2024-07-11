import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MoviesService } from './movies.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MoviesSearchFormComponent } from './movies-search-form/movies-search-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { MovieModalComponent } from './movie-modal/movie-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    MoviesSearchFormComponent,
    MovieCardComponent,
    DialogModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly dialog = inject(Dialog);
  readonly movies = inject(MoviesService).movies;
  readonly params = inject(MoviesService).params;
  readonly moviesTotal = computed(() => {
    const totalPage = this.movies()?.totalPages || 1;
    const limit = this.params()?.limit || 10;
    return totalPage * limit;
  });
  readonly isLoading = inject(MoviesService).isLoading;

  searchHandler(searchValues: { search: string; genre: string }) {
    this.params.update((params) => ({
      ...params,
      search: searchValues.search,
      genre: searchValues.genre || undefined,
    }));
  }

  paginateHandler(prev: 'PREV' | 'NEXT') {
    this.params.update((params) => {
      const page = params.page || 1;
      if (prev === 'PREV') {
        return { ...params, page: page - 1 };
      }
      return { ...params, page: page + 1 };
    });
  }

  openDialogHandler(movieId: string) {
    this.dialog.open(MovieModalComponent, {
      data: {
        movieId,
      },
    });
  }
}
