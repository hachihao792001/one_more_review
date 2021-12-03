import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { fadeIn, fadeOut } from '../../animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  animations: [fadeIn, fadeOut],
})
export class HomePageComponent implements OnInit, AfterViewInit {
  whiteScreen = true;

  constructor(private spinner: NgxSpinnerService, private router: Router) {
    this.whiteScreen = true;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.spinner.hide().then();
    setTimeout(() => {
      this.whiteScreen = false;
    }, 2600);
  }

  handleClickWhiteScreen(): void {
    this.whiteScreen = false;
  }

  handleClickDashboard(): void {
    this.router.navigate(['dashboard']).then();
  }
}
