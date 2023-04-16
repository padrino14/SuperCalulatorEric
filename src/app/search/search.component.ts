import { Component } from '@angular/core';
import {MoviesService} from "../service/movies.service";
import {MovieFilters} from "../model/movie-filters.model";
import {Subject} from "rxjs";
import { isEmpty } from 'rxjs/operators';
import {Movie} from "../model/movie.model";
import { ToastrService } from 'ngx-toastr';
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

  constructor(private toastr: ToastrService,private moviesService: MoviesService) {
    this.moviesService.getAllMovies$()
      .subscribe(movies => {
        this.movies$.next(movies);
      })
  }

  search() : void{
    //alert(this.filters.genre)
    // TODO Implement this method
    this.moviesService.getFilteredMovies$(this.filters)
      .subscribe((data) =>  this.movies$.next(data))
    this.movies$.pipe(
      isEmpty()
    ).subscribe((isEmpty: boolean) => {
      if (isEmpty) {
        alert('Nothing found');
      }
    });
} }
