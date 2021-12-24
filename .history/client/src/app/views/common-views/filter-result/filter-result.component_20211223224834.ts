import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { fadeIn, fadeOut } from '../../animations';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FilterResultService } from 'src/app/services/filter-result.service';
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
    type: "" ,
    year: "",
    nation: "",
  };

  selectedType!: any;
  selectedNation!: any;
  selectedYear!: any;
  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    public sanitizer: DomSanitizer,
    private filterResultService: FilterResultService, // 1 service trả về list film sau khi lọc
  ) {
  }

  ngOnInit(): void {
    this.spinner.hide().then();
    this.resultList = this.filterResultService.getFilterResultList();
    this.selectedProperty = this.filterResultService.getSelectedPropery();
  }

  ngAfterViewInit(): void {}

  onPickFilm(id: string) {
    console.log('movie-id', id);
    //Do stuff
  }

  onFilterMovie(selectedType: any, selectedNation: any, selectedYear: any) {
    console.log('selectedType', selectedType);
    console.log('selectedNation', selectedNation);
    console.log('selectedYear', selectedYear);
    //Do stuff
  }
}
