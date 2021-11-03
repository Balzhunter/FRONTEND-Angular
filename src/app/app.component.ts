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
    // switch(){

    // }
    console.log(this.selectedValue)
    const groupByInvoice = this.lines.reduce(this.reducerByInvoice, []);
    const groupByDistributor = this.lines.reduce(this.reducerByDistributor, []);
    const groupByCustomer = this.lines.reduce(this.reducerByCustomer, [], );
    const groupByProduct = this.lines.reduce(this.reducerByProduct, [], );
    console.log("Grouped by Invoice", groupByInvoice);
    console.log("Grouped by Distributor", groupByDistributor);
    console.log("Grouped by Customer", groupByCustomer);
    console.log("Grouped by Product", groupByProduct);
  }

  reducerByProduct(groupBy: any, el: any) {

    if (Array.isArray(el)) {
      return el.reduce(this.reducerByProduct, groupBy);
    } else {
      const { productCode, ...rest } = el;
      const group = groupBy.find((el: any) => el.productCode === productCode);
      if (group) {
        group.data.push(rest);
      } else {
        groupBy.push({
          productCode,
          data: [rest]
        })
      }
      return groupBy;
    }
  }

  reducerByCustomer(groupBy: any, el: any) {

    if (Array.isArray(el)) {
      return el.reduce(this.reducerByCustomer, groupBy);
    } else {
      const { customerAddress, ...rest } = el;
      const group = groupBy.find((el: any) => el.customerAddress === customerAddress);
      if (group) {
        group.data.push(rest);
      } else {
        groupBy.push({
          customerAddress,
          data: [rest]
        })
      }
      return groupBy;
    }
  }

  reducerByDistributor(groupBy: any, el: any) {

    if (Array.isArray(el)) {
      return el.reduce(this.reducerByDistributor, groupBy);
    } else {
      const { distributorAddress, ...rest } = el;
      const group = groupBy.find((el: any) => el.distributorAddress === distributorAddress);
      if (group) {
        group.data.push(rest);
      } else {
        groupBy.push({
          distributorAddress,
          data: [rest]
        })
      }
      return groupBy;
    }
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
