import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../model/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  apiURL = environment.apiURL;

  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http.get<Movie[]>(`${this.apiURL}/movies-popular`);
  }
}
