import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { fadeIn, fadeOut } from '../../animations';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FilterResultService } from 'src/app/services/filter-result.service';
import { User } from 'src/app/models/user';
import { ProfileService } from 'src/app/services/profile.service';
import { ToastrService } from 'ngx-toastr';
import { FilmService } from 'src/app/services/film.service';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  animations: [fadeIn, fadeOut],
})
export class HomePageComponent implements OnInit, AfterViewInit {
  carouselItems!: any[];
  types!: any[];
  nations!: any[];
  years!: any[];
  films!: Movie[];
  allFilms!: Movie[];
	page: number = 0;
	allPage: number = 0;
	filmPerPage: number = 10;

  selectedType = '';
  selectedNation = '';
  selectedYear = '';
  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    public sanitizer: DomSanitizer,
    private toast: ToastrService,
    private filmService: FilmService
  ) {}

  ngOnInit(): void {
		this.spinner.show();
    this.filmService.getAllFilms().subscribe(
      (res) => {
        if (res) {
          this.allFilms = res.films;
					this.allPage = Math.floor(this.allFilms.length / this.filmPerPage) + 1;
          this.films = this.allFilms.slice(0, this.filmPerPage);
        }
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        this.toast.error('ERROR LOADING DATA FROM SERVER');
      }
    );

    this.carouselItems = [
      {
        id: 1,
        name: 'Spiderman - No way home',
        poster:
          'https://image.thanhnien.vn/w1024/Uploaded/2021/tnabtw/2021_11_17/poster-3930.jpg',
      },
      {
        id: 2,
        name: 'Spiderman - No way home',
        poster:
          'https://image.thanhnien.vn/w1024/Uploaded/2021/tnabtw/2021_11_17/poster-3930.jpg',
      },
      {
        id: 3,
        name: 'Spiderman - No way home',
        poster:
          'https://image.thanhnien.vn/w1024/Uploaded/2021/tnabtw/2021_11_17/poster-3930.jpg',
      },
    ];

    this.types = [
      {
        name: 'Action',
      },
      { name: 'Romantic' },
    ];

    this.nations = [
      {
        name: 'USA',
      },
      {
        name: 'India',
      },
      {
        name: 'China',
      },
      {
        name: 'Japan',
      },
      {
        name: 'Korea',
      },
      {
        name: 'France',
      },
    ];

    this.years = [
      {
        year: '2021',
      },
      {
        year: '2020',
      },
      {
        year: '2019',
      },
      {
        year: '2018',
      },
      {
        year: '2017',
      },
    ];
  }

  ngAfterViewInit(): void {}

  onPickFilm(id: string) {
    this.router.navigate(['/films', id]);
  }

  onFilterMovie(selectedType: any, selectedNation: any, selectedYear: any) {
    this.router.navigate([`/filter-result`], { queryParams: {gene: selectedType, country: selectedNation, year: selectedYear} });

    //Do stuff
  }

  onPrevPage() {
		if (this.page > 0) {
			this.page--;
			this.films = this.allFilms.slice(
      this.page * this.filmPerPage,
      this.page * this.filmPerPage + this.filmPerPage
    );
		}
  }

  onNextPage() {
		if (this.page < this.allPage - 1) {
			this.page++;
			this.films = this.allFilms.slice(
      this.page * this.filmPerPage,
      this.page * this.filmPerPage + this.filmPerPage
    );
		console.log(this.films)
		}
  }
}
