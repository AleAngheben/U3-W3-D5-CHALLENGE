import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../model/movie';
import { Auth } from '../auth/auth';
import { Favorite } from '../model/favourite';
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  apiURL = environment.apiURL;

  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http.get<Movie[]>(`${this.apiURL}/movies-popular`);
  }

  getFavorite() {
    return this.http.get<Favorite[]>(`${this.apiURL}/favorites`);
  }

  addFavorite(movieId: number, userId: number) {
    const favorite: Favorite = {
      movieId: movieId,
      userId: userId,
    };

    return this.http.post<Favorite>(`${this.apiURL}/favorites`, favorite);
  }

  getUserId(): number {
    const user = localStorage.getItem('user');
    if (user) {
      const userData: Auth = JSON.parse(user);
      return userData.user.id;
    }
    return 0;
  }
  getUserInfo(): Auth | null {
    const user = localStorage.getItem('user');
    if (user) {
      const userInfo: Auth = JSON.parse(user);
      return userInfo;
    }
    return null;
  }
  removeFavorite(id: number) {
    return this.http.delete<Favorite>(`${this.apiURL}/favorites/${id}`);
  }
}
