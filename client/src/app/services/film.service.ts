import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  httpOptions!: any;
  private apiUrl = environment.serverUrl;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  getFilm(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/api/films/${id}`);
  }

  getAllFilms(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/films/films`);
  }

  deleteFilm(id: string): Observable<Movie> {
    return this.http.delete<Movie>(`${this.apiUrl}/api/films/${id}`);
  }

  getFilmsByFilter(gene:string, country:string, year:string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/api/films/films/filter?gene=${gene}&country=${country}&year=${year}`);
  }

	postFilm(data: any): Observable<any> {
		return this.http.post<Movie>(
			`${this.apiUrl}/api/films/`,
			data,
			this.httpOptions
		);
	}
}
