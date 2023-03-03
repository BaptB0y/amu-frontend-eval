import {Component} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CustomersService } from "../api/customers.service";
import {Customers} from "../types/customer";

@Component({
  selector: "app-customer-create-page",
  template: `
        <app-customer-form (onNewCustomer)="addCustomer($event, $event)"></app-customer-form>
    `
})
export class CustomerCreatePageComponent {
  customers: Customers = [];
  constructor(private route: ActivatedRoute,  private service: CustomersService) { }

  addCustomer(fullName: string, email: string) {
    this.service
      .create(fullName, email)
      .subscribe((customers) => this.customers.push(customers[0]));
  }
}
