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

  constructor(private appService: AppService) {
    this.searchValue = '';
  }

  onChangeEvent(event: any) {
    this.resultLines = this.lines.filter((line) => {
      // console.log(line.invoiceNumber.toString().includes(this.searchValue.toLocaleLowerCase()));
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
    console.log(this.resultLines);
  }

  ngOnInit(): void {
    this.appService.getAll().subscribe((data: any) => {
      this.lines = data;
      this.resultLines = this.lines;
    });
  }
}
