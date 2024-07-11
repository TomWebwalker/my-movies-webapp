import {MovieEntry} from "./movie-entry";

export interface GetMoviesQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  genre?: string;
}

export interface GetMoviesResponse {
  data: MovieEntry[];
  totalPages: number;
}
