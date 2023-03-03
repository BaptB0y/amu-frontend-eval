import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CustomersService } from "../api/customers.service";
import { Customer } from "../types/customer";
import {Invoices} from "../types/invoice";
import {InvoicesService} from "../api/invoices.service";

@Component({
  selector: 'app-customer-details-page',
  template: `
    <ng-container *ngIf="customer">
      <h2>Fiche de {{ customer.fullName }}</h2>
      <h3>({{ customer.email }})</h3>
      <br />
      <button routerLink="/">Retour aux clients</button>
    </ng-container>
    <ng-container *ngIf="invoices">
      <app-invoices-list
        [invoices]="invoices"
      >
      </app-invoices-list>
    </ng-container>
    <p *ngIf="!customer">Le client n'est pas créé</p>
  `
})
export class CustomerDetailsPageComponent {
  customer?: Customer;
  invoices: Invoices = [];

  constructor(private route: ActivatedRoute,  private customersService: CustomersService, private invoicesService: InvoicesService) { }

  ngOnInit() {
    // On peut récupérer le paramètre "id" qui se trouve
    // dans l'URL, et le transformer en nombre :
    const id: number = Number(this.route.snapshot.paramMap.get('id'));

    this.invoicesService
      .findByCustomerId(id)
      .subscribe((invoices) => this.invoices = invoices);

    this.customersService
      .findOne(id)
      .subscribe(customers => this.customer = customers[0]);
  }
}
