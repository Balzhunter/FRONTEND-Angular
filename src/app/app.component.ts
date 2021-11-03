import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  lines: any[] = [];
  resultLines: any[] = [];
  searchValue: string;
  selectedValue: string;
  options : any[] = [];

  constructor(private appService: AppService) {
    this.searchValue = '';
    this.selectedValue = '';
    this.options = [
      {
        value: "invoice",
        name : "By Invoice"
      },
      {
        value: "distributor",
        name : "By Distributor"
      },
      {
        value: "customerLocation",
        name : "By Customer Location"
      },
      {
        value: "product",
        name : "By Product"
      }
    ]
  }

  onChangeEvent(event: any) {
    this.resultLines = this.lines.filter((line) => {
      return (
        line.invoiceNumber
          .toString()
          .toLocaleLowerCase()
          .includes(this.searchValue.toLocaleLowerCase()) ||
        line.invoiceDate
          .toString()
          .toLocaleLowerCase()
          .includes(this.searchValue.toLocaleLowerCase())
      );
    });

  }

  ngOnInit(): void {
    this.appService.getAll().subscribe((data: any) => {
      this.lines = data;
      this.resultLines = this.lines;
    });
    
  }
}
