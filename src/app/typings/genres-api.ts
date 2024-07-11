import {GenreEntry} from "./genre-entry";

export interface GetGenresResponse {
  data: GenreEntry[];
  totalPages: number;
}
