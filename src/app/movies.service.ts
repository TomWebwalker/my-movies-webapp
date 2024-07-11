import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from './environment';
import { Observable, switchMap, tap } from 'rxjs';
import { GetMoviesQueryParams, GetMoviesResponse } from './typings/movies-api';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MovieItemEntry } from './typings/movie-item-entry';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private readonly http = inject(HttpClient);
  readonly params = signal<GetMoviesQueryParams>({
    page: 1,
    limit: 10,
  });

  readonly movies = toSignal(this.getMovies());
  readonly isLoading = signal(false);

  private getMovies(): Observable<GetMoviesResponse> {
    return toObservable(this.params).pipe(
      tap(() => this.isLoading.set(true)),
      switchMap((params) => {
        const paramsWithValues = Object.entries(params).reduce((prev, curr) => {
          const [key, value] = curr;
          if (value && value !== '') {
            prev[key as keyof GetMoviesQueryParams] = value;
          }
          return prev;
        }, {} as GetMoviesQueryParams);
        return this.http.get<GetMoviesResponse>(`${API_URL}/movies`, {
          params: {
            ...paramsWithValues,
          },
        });
      }),
      tap(() => this.isLoading.set(false)),
    );
  }

  getMovieById(movieId: string): Observable<MovieItemEntry> {
    return this.http.get<MovieItemEntry>(`${API_URL}/movies/${movieId}`);
  }
}
