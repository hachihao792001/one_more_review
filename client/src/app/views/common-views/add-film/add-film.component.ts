import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Movie } from 'src/app/models/movie';
import { NATIONS, TYPES, YEARS, GENRES, STATUS } from 'src/app/utils/constants';

@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.scss'],
})
export class AddFilmComponent implements OnInit {
  types: any[] = TYPES;
  nations: any[] = NATIONS;
  years: any[] = YEARS;
  genres: any[] = GENRES;
  statuses: any[] = STATUS;

  isSubmitted: boolean = false;

  films!: Movie[];
  filmName: string = '';
  filmId: string = '';
  selectedGenre: string = '';
  selectedNation: string = '';
  selectedYear: string = '';
  selectedType: string = '';
  duration: string = '';
  directors: string = '';
  description: string = '';
  actors: string = '';
  status: string = '';
  reviewChannel: string = '';
  trailer: string = '';
  poster: string = '';
  miniPoster: string = '';
  urlFilm: string = '';

  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.spinner.hide().then();
  }

  onSubmit(): void {
    this.isSubmitted = true;

    const item: any = {
      name: this.filmName || '',
      id: this.filmId || '',
      genre: this.selectedGenre || '',
      nation: this.selectedNation || '',
      year: this.selectedYear || '',
      type: this.selectedType || '',
      duration: this.duration || '',
      directors: this.directors || '',
      description: this.description || '',
      actors: this.actors || '',
      status: this.status || '',
      reviewChannel: this.reviewChannel || '',
      trailer: this.trailer || '',
      poster: this.poster || '',
      miniPoster: this.miniPoster || '',
      urlFilm: this.urlFilm || '',
    };

    if (this.isValid()) {
      console.log(item);
    }
  }

  onReset(): void {
    this.isSubmitted = false;

    this.filmName = '';
    this.filmId = '';
    this.selectedGenre = '';
    this.selectedNation = '';
    this.selectedYear = '';
    this.selectedType = '';
    this.duration = '';
    this.directors = '';
    this.description = '';
    this.actors = '';
    this.status = '';
    this.reviewChannel = '';
    this.trailer = '';
    this.poster = '';
    this.miniPoster = '';
    this.urlFilm = '';
  }

  isValid(): boolean {
    const item: any = {
      name: this.filmName || '',
      id: this.filmId || '',
      genre: this.selectedGenre || '',
      nation: this.selectedNation || '',
      year: this.selectedYear || '',
      type: this.selectedType || '',
      duration: this.duration || '',
      directors: this.directors || '',
      description: this.description || '',
      actors: this.actors || '',
      status: this.status || '',
      reviewChannel: this.reviewChannel || '',
      trailer: this.trailer || '',
      poster: this.poster || '',
      miniPoster: this.miniPoster || '',
      urlFilm: this.urlFilm || '',
    };

    const keys = Object.keys(item);

    for (let key of keys) {
      if (key === 'description') {
        if (item[key].trim().length < 50) {
          return false;
        }
      }
      if (key === 'duration') {
        if (this.parseInt(item[key]) <= 0) {
          return false;
        }
      } else {
        if (item[key].trim().length === 0) {
          return false;
        }
      }
    }

    return true;
  }

  parseInt(value: string): number {
    return Number.parseInt(value);
  }

  strLength(value: string): number {
    return value.trim().length;
  }
}
