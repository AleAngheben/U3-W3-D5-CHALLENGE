import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/model/movie';
import { MovieService } from 'src/app/service/movie.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Favorite } from 'src/app/model/favourite';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies: Movie[] | undefined;
  userId: number = 0;
  favorite!: Favorite[];

  constructor(private movieSrv: MovieService, private authSrv: AuthService) {}

  ngOnInit(): void {
    this.userId = this.movieSrv.getUserId();
    this.movieSrv.getMovies().subscribe((movies: Movie[]) => {
      this.movies = movies;
      this.getFavorite();
      console.log(this.movies);
    });
  }

  isFavorite(movieId: number): boolean {
    return (
      Array.isArray(this.favorite) &&
      this.favorite.some((movie) => movie.movieId === movieId)
    );
  }

  addoRem(movieId: number) {
    if (this.isFavorite(movieId)) {
      let val: any = this.favorite.find((movie) => movie.movieId === movieId);
      if (val) {
        this.removeFavorite(val.id);
      }
    } else {
      this.addFavorite(movieId);
    }
  }

  removeFavorite(id: number) {
    this.movieSrv.removeFavorite(id).subscribe(() => {
      this.getFavorite();
    });
  }

  addFavorite(movieId: number) {
    this.movieSrv
      .addFavorite(movieId, this.userId)
      .subscribe((favorite: Favorite) => {
        this.getFavorite();
      });
  }

  getFavorite() {
    this.movieSrv.getFavorite().subscribe((favorite: Favorite[]) => {
      let userFavorite: Favorite[] = favorite.filter(
        (movie) => movie.userId === this.userId
      );
      this.favorite = userFavorite;
    });
  }
}
