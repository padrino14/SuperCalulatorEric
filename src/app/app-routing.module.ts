import {inject, NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {SearchComponent} from "./search/search.component";
import {MovieComponent} from "./movie/movie.component";
import {MoviesService} from "./service/movies.service";
import {NotFoundPageComponent} from "./not-found-page/not-found-page.component";

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: SearchComponent },
  {
    path: 'movie/:id',
    component: MovieComponent,
    resolve: {
      movie: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        let id = Number.parseInt(route.paramMap.get('id'));
        return inject(MoviesService).getMovie$(id);
      }
    }
  },
  { path: '**', component: NotFoundPageComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
