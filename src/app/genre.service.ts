import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from './environment';
import { GetGenresResponse } from './typings/genres-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  private readonly http = inject(HttpClient);

  getGenres(): Observable<GetGenresResponse> {
    return this.http.get<GetGenresResponse>(`${API_URL}/genres/movies`);
  }
}
