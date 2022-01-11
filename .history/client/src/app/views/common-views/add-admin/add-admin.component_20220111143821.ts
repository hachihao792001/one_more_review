import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { stringify } from 'querystring';
@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {
  name!: string;
  email!: string;
  id!: string;

  constructor(private spinner: NgxSpinnerService) { 
    
  }

  ngOnInit(): void {
    this.spinner.hide().then();

  }

}
