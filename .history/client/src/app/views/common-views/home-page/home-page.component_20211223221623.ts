import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { fadeIn, fadeOut } from '../../animations';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FilterResultService } from 'src/app/services/filter-result.service';

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
  films!: any[];

  selectedType = {};
  selectedNation = {};
  selectedYear = {};

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    public sanitizer: DomSanitizer,
    private filterResultService: FilterResultService,
  ) {}

  ngOnInit(): void {
    this.spinner.hide().then();

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

    this.films = [
      {
        type: 'Newest',
        list: [
          {
            id: 1,
            name: 'Spiderman - Homecoming',
            poster:
              'https://gamek.mediacdn.vn/133514250583805952/2021/11/17/photo-1-1637118381839432740223.jpg',
          },
          {
            id: 1,
            name: 'Spiderman - Homecoming',
            poster:
              'https://gamek.mediacdn.vn/133514250583805952/2021/11/17/photo-1-1637118381839432740223.jpg',
          },
          {
            id: 1,
            name: 'Spiderman - Homecoming',
            poster:
              'https://gamek.mediacdn.vn/133514250583805952/2021/11/17/photo-1-1637118381839432740223.jpg',
          },
          {
            id: 1,
            name: 'Spiderman - Homecoming',
            poster:
              'https://gamek.mediacdn.vn/133514250583805952/2021/11/17/photo-1-1637118381839432740223.jpg',
          },
          {
            id: 1,
            name: 'Spiderman - Homecoming',
            poster:
              'https://gamek.mediacdn.vn/133514250583805952/2021/11/17/photo-1-1637118381839432740223.jpg',
          },
          {
            id: 1,
            name: 'Spiderman - Homecoming',
            poster:
              'https://gamek.mediacdn.vn/133514250583805952/2021/11/17/photo-1-1637118381839432740223.jpg',
          },
          {
            id: 1,
            name: 'Spiderman - Homecoming',
            poster:
              'https://gamek.mediacdn.vn/133514250583805952/2021/11/17/photo-1-1637118381839432740223.jpg',
          },
          {
            id: 1,
            name: 'Spiderman - Homecoming',
            poster:
              'https://gamek.mediacdn.vn/133514250583805952/2021/11/17/photo-1-1637118381839432740223.jpg',
          },
        ],
      },
      {
        type: 'High Rating',
        list: [
          {
            id: 1,
            name: 'Spiderman - Homecoming',
            poster:
              'https://gamek.mediacdn.vn/133514250583805952/2021/11/17/photo-1-1637118381839432740223.jpg',
          },
          {
            id: 1,
            name: 'Spiderman - Homecoming',
            poster:
              'https://gamek.mediacdn.vn/133514250583805952/2021/11/17/photo-1-1637118381839432740223.jpg',
          },
          {
            id: 1,
            name: 'Spiderman - Homecoming',
            poster:
              'https://gamek.mediacdn.vn/133514250583805952/2021/11/17/photo-1-1637118381839432740223.jpg',
          },
          {
            id: 1,
            name: 'Spiderman - Homecoming',
            poster:
              'https://gamek.mediacdn.vn/133514250583805952/2021/11/17/photo-1-1637118381839432740223.jpg',
          },
          {
            id: 1,
            name: 'Spiderman - Homecoming',
            poster:
              'https://gamek.mediacdn.vn/133514250583805952/2021/11/17/photo-1-1637118381839432740223.jpg',
          },
          {
            id: 1,
            name: 'Spiderman - Homecoming',
            poster:
              'https://gamek.mediacdn.vn/133514250583805952/2021/11/17/photo-1-1637118381839432740223.jpg',
          },
          {
            id: 1,
            name: 'Spiderman - Homecoming',
            poster:
              'https://gamek.mediacdn.vn/133514250583805952/2021/11/17/photo-1-1637118381839432740223.jpg',
          },
          {
            id: 1,
            name: 'Spiderman - Homecoming',
            poster:
              'https://gamek.mediacdn.vn/133514250583805952/2021/11/17/photo-1-1637118381839432740223.jpg',
          },
        ],
      },
      {
        type: 'Recommended',
        list: [
          {
            id: 1,
            name: 'Spiderman - Homecoming',
            poster:
              'https://gamek.mediacdn.vn/133514250583805952/2021/11/17/photo-1-1637118381839432740223.jpg',
          },
          {
            id: 1,
            name: 'Spiderman - Homecoming',
            poster:
              'https://gamek.mediacdn.vn/133514250583805952/2021/11/17/photo-1-1637118381839432740223.jpg',
          },
          {
            id: 1,
            name: 'Spiderman - Homecoming',
            poster:
              'https://gamek.mediacdn.vn/133514250583805952/2021/11/17/photo-1-1637118381839432740223.jpg',
          },
          {
            id: 1,
            name: 'Spiderman - Homecoming',
            poster:
              'https://gamek.mediacdn.vn/133514250583805952/2021/11/17/photo-1-1637118381839432740223.jpg',
          },
          {
            id: 1,
            name: 'Spiderman - Homecoming',
            poster:
              'https://gamek.mediacdn.vn/133514250583805952/2021/11/17/photo-1-1637118381839432740223.jpg',
          },
          {
            id: 1,
            name: 'Spiderman - Homecoming',
            poster:
              'https://gamek.mediacdn.vn/133514250583805952/2021/11/17/photo-1-1637118381839432740223.jpg',
          },
          {
            id: 1,
            name: 'Spiderman - Homecoming',
            poster:
              'https://gamek.mediacdn.vn/133514250583805952/2021/11/17/photo-1-1637118381839432740223.jpg',
          },
          {
            id: 1,
            name: 'Spiderman - Homecoming',
            poster:
              'https://gamek.mediacdn.vn/133514250583805952/2021/11/17/photo-1-1637118381839432740223.jpg',
          },
        ],
      },
    ];
  }

  ngAfterViewInit(): void {}

  onPickFilm(id: string) {
    console.log('movie-id', id);
    //Do stuff
  }

  onFilterMovie(selectedType: any, selectedNation: any, selectedYear: any) {
    this.filterResultService.selectedPropertyFilter({
      type: selectedType,
      year: selectedYear,
      nation: selectedNation
    });
    console.log('selectedType', selectedType);
    console.log('selectedNation', selectedNation);
    console.log('selectedYear', selectedYear);
    //Do stuff
  }
}
