import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Movie} from "../model/movie.model";
import {MovieFilters} from "../model/movie-filters.model";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private httpClient: HttpClient) {}

  getAllMovies$(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>('/api/movies');
  }
  getAllMoviesFilterByRating$(movieFilters: MovieFilters): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>('/api/movies').pipe(
      map(values => values.filter(movie => {
        return movie.rating >= movieFilters.note;
      }))
    );
  }
  getFilteredMovies$(movieFilters: MovieFilters): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>('api/movies?genre=' + movieFilters.genre).pipe(
      map(values => values.filter(movie => {
        return movie.rating >= movieFilters.note;
      }))
    );
  }

  getMovie$(id: number): Observable<Movie> {
    return this.httpClient.get<Movie>('api/movies/' + id);
  }
}
