import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/model/movie';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies: Movie[] | undefined;

  constructor(private movieSrv: MovieService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.movieSrv.getMovies().subscribe((movies: Movie[]) => {
        this.movies = movies;
        console.log(this.movies);
      });
    }, 1000);
  }
}
