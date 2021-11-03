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
  filteredLines: any[] = [];

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

  onSelectEvent(event: any) {
    // console.log("here")
    // const newData = []

    // const newGroup = this.lines.map((line)=>{
    //   return line.invoiceNumber;
    // })
    
    const groupBy = this.lines.reduce(this.reducerByInvoice, []);
    console.log(groupBy);
  }

  reducerByInvoice(groupBy: any, el: any) {

    if (Array.isArray(el)) {
      return el.reduce(this.reducerByInvoice, groupBy);
    } else {
      const { invoiceNumber, ...rest } = el;
      const group = groupBy.find((el: any) => el.invoiceNumber === invoiceNumber);
      if (group) {
        group.data.push(rest);
      } else {
        groupBy.push({
          invoiceNumber,
          data: [rest]
        })
      }
      return groupBy;
    }
  }


  ngOnInit(): void {
    this.appService.getAll().subscribe((data: any) => {
      this.lines = data;
      this.resultLines = this.lines;
    });
    
  }
}
