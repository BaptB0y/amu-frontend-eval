import {Component} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { InvoicesService } from "../api/invoices.service";
import {Invoices} from "../types/invoice";
import {Customer} from "../types/customer";
import {CustomersService} from "../api/customers.service";

@Component({
  selector: "app-invoice-create-page",
  template: `
        <app-invoice-form (onNewInvoice)="addInvoice($event)"></app-invoice-form>
    `
})
export class InvoiceCreatePageComponent {
  customer?: Customer;
  invoices: Invoices = [];
  constructor(private route: ActivatedRoute,  private service: InvoicesService, private customerService:CustomersService) { }
  id: number = Number(this.route.snapshot.paramMap.get('id'));

  addInvoice(obj: any) {
    this.service
      .create(obj)
      .subscribe((invoices) => this.invoices.push(invoices[0]));
  }
}
