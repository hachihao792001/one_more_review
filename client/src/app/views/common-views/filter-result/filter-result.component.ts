import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { fadeIn, fadeOut } from '../../animations';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FilterResultService } from 'src/app/services/filter-result.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Movie } from 'src/app/models/movie';
import { FilmService } from 'src/app/services/film.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-filter-result',
  templateUrl: './filter-result.component.html',
  styleUrls: ['./filter-result.component.scss'],
})
export class FilterResultComponent implements OnInit, AfterViewInit {
  types!: any[];
  nations!: any[];
  years!: any[];

  selectedProperty = {
    type: '',
    year: '',
    nation: '',
  };

  selectedType!: any;
  selectedNation!: any;
  selectedYear!: any;

  tempType!: any;
  tempNation!: any;
  tempYear!: any;

  films!: Movie[];
  allFilms!: Movie[];
  page: number = 0;
  allPage: number = 0;
  filmPerPage: number = 10;
	isFound: boolean = true;

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    public sanitizer: DomSanitizer,
    private filterResultService: FilterResultService, // 1 service trả về list film sau khi lọc
    private route: ActivatedRoute,
    private filmService: FilmService,
		private toast: ToastrService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.selectedType = params['gene'] || '';
      this.selectedNation = params['country'] || '';
      this.selectedYear = params['year'] || '';

      this.tempNation = this.selectedNation;
      this.tempType = this.selectedType;
      this.tempYear = this.selectedYear;
    });
  }

  getFilmsByFilter() {
    this.spinner.show();
    this.filmService
      .getFilmsByFilter(
        this.selectedType,
        this.selectedNation,
        this.selectedYear
      )
      .subscribe(
        (res) => {
          this.allFilms = res.films;
					this.allPage = Math.floor(this.allFilms.length / this.filmPerPage) + 1;
          this.films = this.allFilms.slice(0, this.filmPerPage);
          this.spinner.hide().then();
        },
        (err) => {
          this.spinner.hide().then();
					this.isFound = false;
        }
      );
  }

  ngOnInit(): void {
		this.spinner.show();
    this.getFilmsByFilter();

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
    console.log('movie-id', id);
    //Do stuff
  }

  onFilterMovie(tempType: any, tempNation: any, tempYear: any) {
    this.selectedType = tempType || '';
    this.selectedNation = tempNation || '';
    this.selectedYear = tempYear || '';

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([`/filter-result`], {
        queryParams: {
          gene: tempType,
          country: tempNation,
          year: tempYear,
        },
      })
    );
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
      console.log(this.films);
    }
  }

	backToHome() {
		this.router.navigate(["/"]);
	}
}
