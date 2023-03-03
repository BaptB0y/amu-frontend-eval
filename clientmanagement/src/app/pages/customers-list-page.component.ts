import { Component } from "@angular/core";
import { CustomersService } from "../api/customers.service";
import { Customers } from "../types/customer";

@Component({
  selector: "app-customer-list-page",
  template: `
        <app-customer-list
            [customers]="customers"
        >
        </app-customer-list>
    `
})
export class CustomerListPageComponent {
  customers: Customers = [];

  constructor(private service: CustomersService) { }

  ngOnInit() {
    this.service
      .findAll()
      .subscribe((customers) => this.customers = customers)
  }
}
