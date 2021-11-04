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
        value: "",
        name: "Select something"
      },
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
    switch(this.selectedValue){
      case "invoice":
        const groupByInvoice = this.lines.reduce(this.reducerByInvoice, []);
        console.log("Grouped by Invoice", groupByInvoice);
        this.filteredLines = groupByInvoice;
        break;
      case "distributor":
        const groupByDistributor = this.lines.reduce(this.reducerByDistributor, []);
        console.log("Grouped by Distributor", groupByDistributor);
        this.filteredLines = groupByDistributor;
        break;
      case "customerLocation":
        const groupByCustomer = this.lines.reduce(this.reducerByCustomer, [], );
        console.log("Grouped by Customer", groupByCustomer);
        this.filteredLines = groupByCustomer;
        break;
      case "product":
        const groupByProduct = this.lines.reduce(this.reducerByProduct, [], );
        console.log("Grouped by Product", groupByProduct);
        this.filteredLines = groupByProduct;
        break;
    }
    console.log(this.selectedValue)
  }

  reducerByProduct(groupBy: any, el: any) {

    if (Array.isArray(el)) {
      return el.reduce(this.reducerByProduct, groupBy);
    } else {
      const { productCode, productDescription } = el;
      const group = groupBy.find((el: any) => el.productCode === productCode);
      if (group) {
        group.data.push(el);
      } else {
        groupBy.push({
          productCode,
          data: [el],
          title: productDescription
        })
      }
      return groupBy;
    }
  }

  reducerByCustomer(groupBy: any, el: any) {

    if (Array.isArray(el)) {
      return el.reduce(this.reducerByCustomer, groupBy);
    } else {
      const { customerAddress } = el;
      const group = groupBy.find((el: any) => el.customerAddress === customerAddress);
      if (group) {
        group.data.push(el);
      } else {
        groupBy.push({
          customerAddress,
          data: [el],
          title: customerAddress
        })
      }
      return groupBy;
    }
  }

  reducerByDistributor(groupBy: any, el: any) {

    if (Array.isArray(el)) {
      return el.reduce(this.reducerByDistributor, groupBy);
    } else {
      const { distributorAddress } = el;
      const group = groupBy.find((el: any) => el.distributorAddress === distributorAddress);
      if (group) {
        group.data.push(el);
      } else {
        groupBy.push({
          distributorAddress,
          data: [el],
          title: distributorAddress
        })
      }
      return groupBy;
    }
  }

  reducerByInvoice(groupBy: any, el: any) {

    if (Array.isArray(el)) {
      return el.reduce(this.reducerByInvoice, groupBy);
    } else {
      const { invoiceNumber } = el;
      const group = groupBy.find((el: any) => el.invoiceNumber === invoiceNumber);
      if (group) {
        group.data.push(el);
      } else {
        groupBy.push({
          invoiceNumber,
          data: [el],
          title: invoiceNumber
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
