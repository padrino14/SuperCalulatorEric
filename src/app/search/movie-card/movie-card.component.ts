import {Component, Input} from '@angular/core';
import {Movie} from "../../model/movie.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {
  @Input()
  movie: Movie;
  rate: number = this["movie"].rating;
  i:number[] ;

  constructor(private router: Router) {
    for (let j = 1; j < this.rate; j++) {
      // @ts-ignore
      this.i= [...j,this.i]
    }
  }

  protected readonly toString = toString;
}
