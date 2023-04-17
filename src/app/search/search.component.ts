import { Component } from '@angular/core';
import {MoviesService} from "../service/movies.service";
import {MovieFilters} from "../model/movie-filters.model";
import {Subject} from "rxjs";
import { isEmpty } from 'rxjs/operators';
import {Movie} from "../model/movie.model";
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  filters: MovieFilters = {
    genre: 'Crime',
    note: 5
  }
  movies$: Subject<Movie[]> = new Subject<Movie[]>();

  constructor(private moviesService: MoviesService) {
    this.moviesService.getAllMovies$()
      .subscribe(movies => {
        this.movies$.next(movies);
      })
  }

  search() : void{

    if (this.filters.genre === "All Movies"){
      this.moviesService.getAllMoviesFilterByRating$(this.filters)
        .subscribe(movies => {

            if(movies.length === 0){
              alert("Nothing found !!!!");
            }else{
              this.movies$.next(movies);
            }

        })
    }else {
      this.moviesService.getFilteredMovies$(this.filters)
        .subscribe((movies) => {
          if(movies.length === 0){
              alert("Nothing found !!!!");
          }else{
            this.movies$.next(movies)
          }
        })
    }
  }
}
