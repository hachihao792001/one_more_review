import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { fadeIn, fadeOut } from '../../animations';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FilterResultService } from 'src/app/services/filter-result.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-filter-result',
  templateUrl: './filter-result.component.html',
  styleUrls: ['./filter-result.component.scss']
})
export class FilterResultComponent implements OnInit, AfterViewInit {
  types!: any[];
  nations!: any[];
  years!: any[];
  films!: any[];
  resultList!: any[];

  selectedProperty = {
    type: "All",
    year: "All",
    nation: "All",
  };

  selectedType!: any;
  selectedNation!: any;
  selectedYear!: any;
  

  selectType!: any;
  selectNation!: any;
  selectYear!: any;

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    public sanitizer: DomSanitizer,
    private filterResultService: FilterResultService, // 1 service trả về list film sau khi lọc
    private activatedRoute: ActivatedRoute,
  ) {
  }

 


  ngOnInit(): void {
    this.spinner.hide().then();
    this.resultList = this.filterResultService.getFilterResultList();
    this.selectedType = JSON.stringify(this.activatedRoute.snapshot.paramMap.get('type'));
    this.selectedNation = JSON.stringify(this.activatedRoute.snapshot.paramMap.get('nation'));
    this.selectedYear = JSON.stringify(this.activatedRoute.snapshot.paramMap.get('year'));
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

  onFilterMovie(selectType: any, selectNation: any, selectYear: any) {
    this.selectedType = selectType;
    this.selectedNation = selectNation;
    this.selectedYear = selectYear;
    console.log('selectedType', selectType);
    console.log('selectedNation', selectNation);
    console.log('selectedYear', selectYear);
    //Do stuff

    this.router.navigate(['/filter-result',selectType,selectNation,selectYear])
  }
}
